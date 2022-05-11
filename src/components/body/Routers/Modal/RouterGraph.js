import React from "react";
import { Modal, ModalBody, Button, ModalFooter } from "reactstrap";
import RouterCharts from "./Charts/RouterCharts";

const RouterGraph = (props) => {
  const style = {
    opacity: "0.95",
  };
  return (
    <Modal
      style={style}
      isOpen={props.routerModalOpen}
      fullscreen="xl"
      size="xl"
      centered
      toggle={props.toggleRouterModalHandler}
    >
      <ModalBody>
        <RouterCharts selectedRouterUsage={props.selectedRouterUsage} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => props.toggleRouterModalHandler()} color="danger">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RouterGraph;
