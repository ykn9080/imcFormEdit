import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalVariable } from "actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import { currentsetting } from "config/index.js";
import { Button, Tooltip, message } from "antd";
import { DesktopOutlined, SaveOutlined, CopyOutlined } from "@ant-design/icons";
import PageHead from "components/Common/PageHeader";
import AntFormBuild from "Form/AntFormBuild";
import AntFormDisplay from "Form/AntFormDisplay";
import _ from "lodash"
import "components/Common/Antd.css";
import useForceUpdate from "use-force-update";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const FormEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  let iconSpin = {},
    btnDisabled = {};

  //for snackbar open/close
  const [open, setOpen] = useState(false);
  const [fsummaryInit, setFsummaryInit] = useState();
  const [update, setUpdate] = useState(false);
  const [idcode, setIdcode] = useState();
  const [backupNewFormData, setBackupNewFormData] = useState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  let formdt1 = {
    data: {
      setting: {
        formItemLayout: {
          labelCol: { span: 2 },
          wrapperCol: { span: 22 },
        },
        layout: "horizontal",
        formColumn: 1,
        size: "middle",
        lineheight: "middle",
      },
      list: [],
    },
  };

  let newFormData = useSelector((state) => state.global.currentData);
console.log(newFormData)

  let selectedKey = useSelector((state) => state.global.selectedKey);
  //if (!selectedKey) history.push("/admin/control/form");
  if (selectedKey === "imsi") selectedKey = "";

  let initialValue = {};

  let currFormData = {
    setting: {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      layout: "horizontal",
      formColumn: 2,
      size: "middle",
      lineheight: "middle",
      initialValues: {
        ...{ initialValue },
      },

      onValuesChange: (changedValues, allValues) => {
        if(newFormData){
        let sett = newFormData?.data?.setting;
        if(!sett) sett={};
        if(!sett.formItemLayout) sett={...sett, formItemLayout:{labelCol:{span:""},wrapperCol:{span:""}}};
        sett={...sett, formItemLayout:{labelCol:{span:allValues.labelwidth},wrapperCol:{span: 24 - allValues.labelwidth}}};
         sett.formColumn = allValues.column;
        sett.layout = allValues.layout;
        sett.size = allValues.size;
        sett.lineheight = allValues.lineheight;

         }
        //console.log(newFormData,allValues)
       
        //dispatch(globalVariable({ currentData: newFormData }));
        
        //if (["name", "desc"].indexOf(Object.keys(changedValues)[0]) === -1)
        //forceUpdate();
        localStorage.setItem("allValues", JSON.stringify(allValues))
        //updateForm(allValues)
      },
      onFinish: (values) => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      },
    },

    list: [
      {
        label: "Column",
        name: "column",
        type: "select",
        defaultValue: 1,
        optionArray: [
          { text: "1", value: 1 },
          { text: "2", value: 2 },
          { text: "3", value: 3 },
        ],
        seq: 3,
      },
      {
        label: "Layout",
        name: "layout",
        type: "radio.button",
        defaultValue: "horizontal",
        optionArray: [
          { text: "horizontal", value: "horizontal" },
          { text: "vertical", value: "vertical" },
          { text: "inline", value: "inline" },
        ],
        seq: 4,
      },
      {
        label: "Label Width",
        name: "labelwidth",
        type: "slider",
        min: 0,
        max: 24,
        defaultValue: 6,
        marks: {
          0: 0,
          2: 2,
          4: 4,
          6: 6,
          8: 8,
          10: 10,
          12: 12,
          14: 14,
          16: 16,
          18: 18,
          20: 20,
          22: 22,
          24: 24,
        },
        seq: 5,
      },
      {
        label: "Size",
        name: "size",
        type: "radio.button",
        defaultValue: "middle",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 6,
      },
      {
        label: "LineHeight",
        name: "lineheight",
        type: "radio.button",
        defaultValue: "middle",
        optionArray: [
          { text: "small", value: "small" },
          { text: "middle", value: "middle" },
          { text: "large", value: "large" },
        ],
        seq: 7,
      },
    ],
  };

  let updateInitialValues = (currFormData, newFormData) => {
    if(!currFormData)return
    const initialValue = {
      column: newFormData.data?.setting?.formColumn,
      labelwidth: newFormData.data?.setting?.formItemLayout?.labelCol?.span |2,
      layout: newFormData.data?.setting.layout,
      size: newFormData.data?.setting.size,
      lineheight: newFormData.data?.setting.lineheight,
    };

    currFormData.setting.initialValues = initialValue;
    return currFormData;
  };

  const [sumdt, setSumdt] = useState();
  useEffect(() => {
    
  if (newFormData === "") {
    dispatch(globalVariable({ currentData: formdt1 }));
  }
  else {
    const newcurrFormData = updateInitialValues(currFormData, newFormData);
    setSumdt(newcurrFormData)
   
  }
    window.addEventListener("message", (event) => {
      // IMPORTANT: check the origin of the data!

      if (event.origin.startsWith("http://localhost:3000")) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:

        let set = event.data.data.setting;
        const init = {
          column: set.formColumn,
          labelwidth: set.formItemLayout?.labelCol?.span | 2,
          layout: set.layout,
          size: set.size,
          lineheight: set.lineheight,
        };
        event.data.data.setting.initialValues = init;
        if(!set.formItemLayout){
          set={...set, formItemLayout:{labelCol:{span:2},wrapperCol:{span: 22}}};
        }
        dispatch(globalVariable({ currentData: event.data })); 
        console.log(event.data)
         setBackupNewFormData(event.data)
      } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
      }
    });
  }, []);
  useEffect(() => {
  //   console.log("newformdata가 달라졌으니 한번더",newFormData)
  //   //dispatch(globalVariable({ formEdit: true }));
  //   //temporary use for editing phase only for
  //   //initialValue setting, pls delete when save
  //   // newFormData.data.setting = {
  //   //   ...newFormData.data.setting,
  //   //   onValuesChange: (changedValues, allValues) => {
  //   //     newFormData.data.setting.initialValues = {
  //   //       ...newFormData.data.setting.initialValues,
  //   //       ...changedValues,
  //   //     };
  //   //     dispatch(globalVariable({ currentData: newFormData }));
  //   //   },
  //   // };
console.log(_.cloneDeep(newFormData))

 let sumdt1=sumdt;
if(newFormData!=="")
   
    if(!sumdt1)sumdt1=currFormData;
   setSumdt(updateInitialValues(sumdt1, newFormData));
  //   //if (newFormData._id) setUpdate(true);
   }, [newFormData]);
   const updateForm=(newform, allValues)=>{

         newform.data.setting.formItemLayout={labelCol:{span:allValues.labelwidth},wrapperCol:{span: 24 - allValues.labelwidth}};
         newform.data.setting.formColumn = allValues.column;
        newform.data.setting.layout = allValues.layout;
        newform.data.setting.size = allValues.size;
        newform.data.setting.lineheight = allValues.lineheight;
        delete newform.data.setting.initialValues;
        delete newform.data.setting.initial;
        console.log(newform,allValues)
       
       return newform
   }
  if (typeof newFormData._id === "undefined") {
    // iconSpin = { spin: true };
    btnDisabled = { disabled: true };
  }
  const cleanuplist = (list) => {
    const deletetrash = (k) => {
      let kk = { ...k };
      delete kk.formColumn;
      delete kk.layout;
      delete kk.formItemLayout;
      delete kk.tailLayout;
      delete kk.editable;
      return kk;
    };
    list.map((k, i) => {
      let kk = { ...k };
      if (k.type === "nostyle")
        kk.array.map((a, b) => {
          let newa = deletetrash(a);
          kk.array.splice(b, 1, newa);
          return null;
        });
      kk = deletetrash(kk);
      list.splice(i, 1, kk);
      return null;
    });
    return list;
  };
  const extra = [
    <Tooltip title="Save" key="1save">
      <Button
        shape="circle"
        icon={<SaveOutlined {...iconSpin} />}
        onClick={() => {
          message.config({
            top: 100,
            duration: 3,
            maxCount: 3,
            rtl: true,
          });
          // //remove onValuesChange
          //inorderto set initialValues, append onValuesChange eventhandler
          //must remove onValuesChange when to save to database
          delete newFormData.data.setting.onValuesChange;
          //cleanup list
          const list = cleanuplist(newFormData.data.list);
          newFormData.data.list = list;
          newFormData.type = "form";
          let allval=localStorage.getItem("allValues");
          if(allval){
          const updform=updateForm(newFormData, JSON.parse(allval));
 dispatch(globalVariable({ currentData: updform }));
 localStorage.removeItem("allValues")
          }
          // console.log(newFormData)
          // let formid = newFormData._id;
          // if (idcode) formid = idcode;
          // let config;
          // config = {
          //   method: "put",
          //   url: `${currentsetting.webserviceprefix}bootform/${formid}`,
          //   data: newFormData,
          // };

          //fsummaryInit ? (config = configput) : (config = configpost);
          //   ?
          //   : {
          //       method: "post",
          //       url: `${currentsetting.webserviceprefix}bootform`,
          //       data: newFormData,
          //     };
          // if (typeof newFormData._id === "undefined" && update === false)
          //   config = {
          //     ...config,
          //     ...{
          //       method: "post",
          //       url: `${currentsetting.webserviceprefix}bootform`,
          //     },
          //   };
          // axios(config).then((r) => {
          //   const dt = r.data;
          //   if (config.method === "post" && update === false) {
          //     setFsummaryInit({
          //       id: dt._id,
          //       name: dt.name,
          //       desc: dt.desc,
          //       column: dt.data.setting?.formColumn,
          //       layout: dt.data.setting?.layout,
          //       labelwidth: dt.data.setting.formItemLayout.labelCol.span,
          //       size: dt.data.setting?.size,
          //       lineheight: dt.data.setting?.lineheight,
          //     });
          //     setUpdate(true);
          //     setIdcode(dt._id);
          //     // history.push("/open/blank");
          //   }
          //   message.info("File Saved");
          // });
        }}
      />
    </Tooltip>,
    <Tooltip title="Save As" key="1saveas">
      <Button
        {...btnDisabled}
        shape="circle"
        icon={<CopyOutlined />}
        onClick={() => {
          //remove onValuesChange
          let curr = cloneDeep(newFormData);
          delete curr.data.setting.onValuesChange;
          delete curr._id;

          curr.name += " Copy";
          sumdt.setting.initialValues.name += " Copy";
          curr.data.setting.initialValues = sumdt.setting.initialValues;

          setOpen(true);
          dispatch(globalVariable({ currentData: curr }));
        }}
      />
    </Tooltip>,
    <Tooltip title="View" key="2view">
      <Button
        {...btnDisabled}
        shape="circle"
        icon={<DesktopOutlined />}
        onClick={() => history.push("/admin/control/form/formview")}
      />
    </Tooltip>,
  ];
  const SaveAsCancel = () => {
    newFormData._id = selectedKey;
    newFormData.name = newFormData.name.replace(" Copy", "");
    dispatch(globalVariable({ currentData: newFormData }));
    setOpen(false);
  };

  const snack = (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      message="Click save button to finish!!!"
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={SaveAsCancel}>
            Undo
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      {/* <Alert onClose={handleClose} severity="warning">
        Click save button to finish!!!
      </Alert> */}
    </Snackbar>
  );
  const onReload = () => {
    history.push("/admin/control/form/formview?rtn=formEdit");
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHead title="FormEdit" extra={extra} ghost={false}>
          {sumdt && <AntFormDisplay formArray={sumdt} name={"fsummary"} />}
        </PageHead>
      </div>
      <div style={{ margin: 10 }}>
        <AntFormBuild formdt={newFormData} reload={onReload} />
      </div>
      <Button
        onClick={() => {
          var data = "data from iframe";
          //window.parent.receiveDataFromIFrame(data);
          window.parent.postMessage(JSON.stringify(newFormData), "*"); // '*' on any domain
        }}
      >
        update
      </Button>
      <Button
        onClick={() => {
         console.log(newFormData,sumdt,backupNewFormData)
        }}
      >
        newFormData,sudmt,backupNewFormData
      </Button>
      {snack}
    </>
  );
};

export default FormEdit;
