import { localHandle } from "components/functions/LodashUtil";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import AntFormDisplay from "./AntFormDisplay";

const { Text } = Typography;

const AntFormDisplayMulti = (props) => {
  let [finishmulti, setFinishmulti] = useState();
  useEffect(() => {
    localHandle("onFinish", "remove");
    localHandle("onFinishMulti", "remove");
    updateValues();
  }, [props.multiArr]);

  const updateValues = (formid, val) => {
    let valobj = {};
    if (!formid)
      finishmulti = props.multiArr.map((k, i) => {
        valobj = { ...valobj, ...k.initialValues };
        return { formid: k.formid, val: k.initialValues };
      });
    else
      finishmulti.map((k, i) => {
        if (k.formid === formid) {
          k.val = val;
          finishmulti.splice(i, 1, k);
        }
        valobj = { ...valobj, ...k.val };
        return false;
      });
    setFinishmulti(finishmulti);
    localHandle("onFinishMulti", finishmulti);
    localHandle("onFinish", valobj);
  };
  const onValuesChange1 = (changedValues, allValues, formid) => {
    if (props.onChange) {
      props.onChange(allValues, formid);
    }
    updateValues(formid, allValues);
  };

  return props.multiArr
    ? props.multiArr.map((k, i) => {
        return (
          <>
            {props.editmode && (
              <div>
                <Text mark>
                  Form{i + 1} : {k.formid}
                </Text>
              </div>
            )}
            <AntFormDisplay
              formid={k.formid}
              onValuesChange={(changedValues, allValues) =>
                onValuesChange1(changedValues, allValues, k.formid)
              }
              initialValues={k.initialValues}
              filteredValues={(filteredval) =>
                updateValues(k.formid, filteredval)
              }
              patchlist={k.patchlist}
            />
          </>
        );
      })
    : null;
};

export default AntFormDisplayMulti;
