import { Descriptions, Modal } from "antd";

import { IUser } from "types/user.model";

interface UserDetailProps {
  title: string;
  visible?: boolean;
  handleCancel?: () => void;
  handleOk?: () => void;
  user: IUser;
}
const UserDetail = ({
  title,
  visible,
  handleCancel,
  handleOk,
  user
}: UserDetailProps) => {
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Descriptions layout="vertical">
          <Descriptions.Item label="Name">
            {user.firstName} {user.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
          <Descriptions.Item label="Role">
            {user.isAdmin ? (
              <span className="bg-green-600 rounded px-2 py-1 text-white">
                Admin
              </span>
            ) : (
              <span className="bg-[#f16331] rounded px-2 py-1 text-white">
                User
              </span>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default UserDetail;
