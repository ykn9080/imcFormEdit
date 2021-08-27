import React, { useEffect } from "react";
import FormList from "Form/FormList";
import FormView from "Form/FormView";
import FormEdit from "Form/FormEdit";
import FormMulti from "Form/ModelViewParameter";
import PageHead from "components/Common/PageHeader";

const Admin = ({ match }) => {
  let title = match.params.name,
    titleUpper = "";
  if (typeof match.params.child != "undefined") title = match.params.child;
  if (typeof match.params.grandchild != "undefined")
    title = match.params.grandchild;
  if (title) {
    titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
    if (title.indexOf("allpurpose") > -1) {
      let up = titleUpper.replace("Allpurpose", "");
      titleUpper = up.charAt(0).toUpperCase() + up.slice(1);
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      {/* <DenseAppBar title={"Admin"}>
        <AntMenu menuList={adminMenu} />
      </DenseAppBar> */}
      {/* formview, formedit은 독립적인 pagehead를 가짐 */}
      {["formview", "formedit", "form"].indexOf(title) === -1 ? (
        <PageHead title={titleUpper} />
      ) : null}
      {(() => {
        switch (title) {
          case "form":
          case "table":
          case "chart":
          case "data":
            return <FormList type={title} />;
          case "formview":
            return <FormView />;
          case "formedit":
            return <FormEdit />;
          case "formmulti":
            return <FormMulti />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Admin;
