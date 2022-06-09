//@see https://ant.design/components/upload/

import './App.css';

import { PlusOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import { useState } from 'react';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 4,
      }}
    >
      アップロード
    </div>
  </div>
);



const App = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    console.log("handlePreview");

    file.preview = await getBase64(file.originFileObj);

    setPreviewImage(file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  const handleChange = ({ file: newFile, fileList: newFileList }) => {
    const uid = newFileList[newFileList.length - 1]?.uid
    console.log(newFile.uid, uid);

    if (newFile.uid === uid && newFileList.length > 5) {
      message.error("error!");
      setFileList(fileList);
      return;
    }

    setFileList(newFileList);
  }


  const beforeUpload = async (file, fileList) => {
    return new Promise(resolve => {
      // trueならactionに指定した箇所にアップロードする
      resolve(false);
    });
  }

  const onSuccess = (file) => {
    console.log('onSuccess', file, file.name);
  }

  const onError = (err) => {
    console.log('onError', err);
  }

  const onRemove = (file) => {
    console.log("onRemove", file)
  }

  const itemRender = (
    originNode,
    file,
    fileList,
    actions,
  ) => {
    if (!file.type?.match('video')) {
      return originNode;
    }

    if (file.originFileObj === undefined) return
    return (
      <div
        file={file.originFileObj}
      />
    )
  }
  const removeList = (e) => {
    console.log(e, fileList);
    setFileList([]);
  }
  const allRemove = (
    <button onClick={removeList}>
      <MinusSquareOutlined />
      <div
        style={{
          marginTop: 4,
        }}
      >
        削除
      </div>
    </button>
  );



  return (
    <>
      <Upload
        multiple={true}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        onSuccess={onSuccess}
        onError={onError}
        onRemove={onRemove}
        itemRender={itemRender}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      {allRemove}
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt={previewTitle}
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default App;

