import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPredict = (props) => {
  const data = props.data;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <b>Dự Đoán Điểm</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Môn Học: <b>{props.name}</b>
        </h4>
        <p>
          Dự đoán bạn sẽ đạt được <b>{data[3]}</b> điểm trong môn {props.name}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalPredict;
