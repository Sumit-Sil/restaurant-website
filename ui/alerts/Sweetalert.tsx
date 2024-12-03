import SweetAlert from "react-bootstrap-sweetalert";
function SweetAlertComponent({ confirm, cancel, title, subtitle, type }:any) {
  return (
    <SweetAlert
      style={{ zIndex: "1" }}
      title={
        <span
          dangerouslySetInnerHTML={{
            __html: `${title} <br /><small>${subtitle}</small>`,
          }}
        />
      }
      onConfirm={confirm}
      type={type !== undefined ? type : "danger"}
      showCancel={true}
      confirmBtnStyle={{ backgroundColor: "#024b98" }}
      onCancel={cancel}
    />
  );
}

export default SweetAlertComponent;