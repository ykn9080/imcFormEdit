import React, { useState } from "react";
import _ from "lodash";
import { generate, presetPalettes } from "@ant-design/colors";
import { Select, Button, Menu, Dropdown, Row, Col, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;
const { CheckableTag } = Tag;
const MixColors = (level) => {
  let rtn = [];
  if (!level) level = 5;
  const cls = Object.keys(presetPalettes);
  cls.map((k, i) => {
    rtn.push(presetPalettes[k][level]);
    return null;
  });
  return rtn;
};
//type:multipel/single, conditionArray:(multi:[level], single:[color])
//ex:{"multiple",[5,7]} or {"single",["red","blue"]}
export const getColors = (type, conditionArray) => {
  if (!type) {
    type = "multiple";
    conditionArray = [5, 7];
  }
  if (!conditionArray | (conditionArray.length === 0)) {
    switch (type) {
      case "multiple":
        conditionArray = [5, 7];
        break;
      default:
        conditionArray = ["blue", "red"];
        break;
    }
  }
  let rtn = [];
  switch (type) {
    case "multiple":
      conditionArray.map((k, i) => {
        rtn = rtn.concat(MixColors(k));
        return null;
      });
      break;
    default:
      conditionArray.map((k, i) => {
        rtn = rtn.concat(generate(k));
        return null;
      });
      break;
  }
  return rtn;
};
const ColorAnt = (props) => {
  const [show, setShow] = useState();
  const [selcolor, setSelcolor] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const selectChange = (val) => {
    if (val === "single") setShow(false);
    else setShow(true);
  };
  const sel = (
    <Select style={{ width: 120 }} onChange={selectChange}>
      <Option value="single">Single</Option>
      <Option value="multiple">Multiple</Option>
    </Select>
  );

  const CheckableTags = (props) => {
    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
      setSelectedTags(nextSelectedTags);
    };
    return props.colors.map((tag) => (
      <CheckableTag
        key={tag}
        checked={selectedTags.indexOf(tag) > -1}
        onChange={(checked) => handleChange(tag, checked)}
      >
        <Tag style={{ marginTop: 3 }} color={tag}>
          {tag}
        </Tag>
      </CheckableTag>
    ));
  };
  const ColorMenu = (props) => {
    function handleMenuClick(e) {
      if (props.type === "multi") setSelcolor(MixColors(e.key));
      else setSelcolor(generate(e.item.props.style.backgroundColor));
    }
    let setting = {};
    if (props.mode) setting = { mode: props.mode };
    return (
      <Menu onClick={handleMenuClick} {...setting}>
        {props.colors.map((k, i) => {
          return (
            <Menu.Item key={i} style={{ backgroundColor: k }}>
              {k}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  const DropMenu = (props) => {
    return (
      <Dropdown
        overlay={<ColorMenu colors={props.colors} type={props.type} />}
        placement="bottomCenter"
        onChange={onChange}
      >
        <Button>{props.title} </Button>
      </Dropdown>
    );
  };
  const onChange = (val) => {
    console.log(val);
  };
  const btnSelect = (type) => {
    let newsel = [...selcolor];
    if (type === "reverse") newsel = _.reverse(newsel);
    const newcolor = selectedTags.concat(newsel);
    if (props.select) props.select(newcolor);
  };
  return (
    <div>
      <Row>
        <Col>
          Color Type : {sel}
          {show === true && (
            <DropMenu
              colors={generate("#bfbfbf")}
              title={"Level"}
              type="multi"
            />
          )}
          {show === false && (
            <DropMenu colors={MixColors()} title={"Color"} type="single" />
          )}
          <div style={{ marginTop: 10, width: 300 }}>
            {/* <ColorTag colors={selcolor} /> */}
            <CheckableTags colors={selcolor} />
            {selcolor.length > 0 && (
              <div style={{ textAlign: "right", marginTop: 5 }}>
                <Button
                  icon={<DownOutlined />}
                  onClick={() => btnSelect("reverse")}
                />
                <Button type="primary" onClick={btnSelect}>
                  Select
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ColorAnt;
