import React, { useEffect } from "react";
import requireAuth from "../../utils/RequireAuth";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { get_Recipe, delete_Recipe } from "./RecipeActions";
import {
  Layout,
  Space,
  Typography,
  Divider,
  Button,
  Rate,
  Tabs,
  Timeline,
  Input,
  Tag,
  Form,
  Popconfirm,
  Radio,
  Spin,
  Dropdown,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { titleCase } from "../../utils";

const Recipe = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const recipe = useSelector((state) => state.recipe.recipe);
  let params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Title, Text, Link } = Typography;
  const { Header, Content } = Layout;
  console.log(recipe);

  useEffect(() => {
    get_Recipe(params.id, dispatch, displayMessage);
  }, []);

  const displayMessage = (message, type) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 3,
    });
  };

  // Tab Functions
  const changeTab = (key) => {
    console.log(key);
  };

  // Dropdown Functions
  const items = [
    {
      label: "Edit Recipe",
      key: "1",
      icon: <EditOutlined />,
    },
    {
      label: "Delete Recipe",
      key: "2",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (e) => {
    console.log(e.key);
    if (e.key === "1") {
      navigate("edit");
    } else {
      delete_Recipe(recipe.id, navigate, displayMessage);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return Object.keys(recipe).length ? (
    <Layout id="recipe-layout">
      {contextHolder}
      <Content
        style={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          margin: "15px 0",
          textAlign: "center",
        }}
      >
        <Title level={2} style={{ marginBottom: "5px" }}>
          {recipe.title}
        </Title>
        <Text>
          <strong>Author: </strong>
          <em>{recipe.author ? recipe.author : "No Assigned Author"}</em>
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            type={recipe.has_made ? "primary" : "default"}
            className={recipe.has_made ? "btn-active" : "btn"}
            // onClick={(e) =>
            //   handleUpdate(
            //     "has_made",
            //     recipe.unique_id,
            //     recipe.has_made,
            //     updaterecipe
            //   )
            // }
            danger
            shape="round"
          >
            Cooked
          </Button>
          <Rate
            value={recipe.rating}
            // onChange={(rating) =>
            //   handleUpdate(
            //     "rating",
            //     recipe.unique_id,
            //     rating,
            //     updaterecipe
            //   )
            // }
          />
        </div>
        <Text style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          <strong>Saved On: </strong>
          {moment(recipe.timestamp).format("MMMM Do YYYY")}
        </Text>
      </Content>
      <Content style={{ padding: " 0 1.2em 1.2em 1.2em" }}>
        <div className="drawer-div">
          <div className="drawer-div-actions">
            <Dropdown menu={menuProps}>
              <Button>
                <Space>Options</Space>
              </Button>
            </Dropdown>
            {/* <Radio.Group style={{ width: "100%", textAlign: "center" }}>
              <Popconfirm
                key="delete"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                title="Are you sure??"
                okText="Delete"
                okType="danger"
                placement="bottom"
                // onConfirm={() => (
                // handleDelete(recipe.unique_id, "recipes"),
                // onClose()
                // )}
              >
                <Radio.Button style={{ width: "50%" }} className="btn">
                  <DeleteOutlined />
                </Radio.Button>
              </Popconfirm>
              <Radio.Button
                style={{ width: "50%" }}
                // onClick={() => setIsEditing(true)}
              >
                <EditOutlined key="edit" />
              </Radio.Button>
            </Radio.Group> */}
          </div>
          <img
            src={
              recipe.img_src
                ? recipe.img_src
                : "./static/graphics/default_image.jpg"
            }
          />
        </div>
        <div className="drawer-div">
          {recipe.url.length ? (
            <Link href={recipe.url} target="_blank">
              <Button
                className="btn-active"
                type="primary"
                block
                style={{ marginTop: "15px" }}
                danger
              >
                Visit Recipe Webpage
              </Button>
            </Link>
          ) : null}
        </div>
        <Tabs
          defaultActiveKey="1"
          onChange={changeTab}
          items={[
            {
              label: `Description`,
              key: "1",
              children: (
                <div className="drawer-div">
                  <p>
                    {recipe.description ? (
                      recipe.description
                    ) : (
                      <em>There is no description for this</em>
                    )}
                  </p>
                </div>
              ),
            },
            {
              label: `Tags/Notes`,
              key: "2",
              children: (
                <>
                  <Divider orientation="left">
                    <strong>
                      <em>Tagged As:</em>
                    </strong>
                  </Divider>
                  {recipe.tags.length > 0 ? (
                    recipe.tags.map((tag, index) => {
                      return (
                        <Tag
                          color="#d32f2f"
                          key={uuidv4()}
                          className="edit-tag tag-input"
                        >
                          {titleCase(tag)}
                        </Tag>
                      );
                    })
                  ) : (
                    <p>
                      <em>This recipe has not been tagged yet</em>
                    </p>
                  )}
                  {/* {inputVisible && (
                  <Form
                    name="new-tag-form"
                    form={tagForm}
                    id="new-tag-form"
                    onFinish={(value) => (
                      value.newTag
                        ? handleInputConfirm(value.newTag.trim())
                        : null,
                      tagForm.resetFields()
                    )}
                  >
                    <Form.Item name="newTag">
                      <Input
                        type="text"
                        size="small"
                        className="tag-input"
                        placeholder="Add a new tag"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="btn-active"
                        htmlType="submit"
                        type="primary"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                )} */}
                  {/* {!inputVisible && (
                  <div id="new-tag-div">
                    <Tag
                      className="site-tag-plus"
                      style={{ border: "1px dashed #d32f2f" }}
                      onClick={showInput}
                    >
                      <PlusOutlined /> New Tag
                    </Tag>
                  </div>
                )} */}
                  <Divider orientation="left">
                    <strong>
                      <em>Notes:</em>
                    </strong>
                  </Divider>
                  <Form
                    name="new-notes-form"
                    // form={noteForm}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                    autoComplete="off"
                    // onFinish={(value) => (
                    //   handleUpdate(
                    //     "notes_add",
                    //     recipe.unique_id,
                    //     value.newNote.trim(),
                    //     updaterecipe
                    //   ),
                    //   noteForm.resetFields()
                    // )}
                  >
                    <Form.Item name="newNote" style={{ width: "100%" }}>
                      <Input.TextArea
                        id="new-note-textarea"
                        placeholder="Add a new note"
                        allowClear
                        autoSize
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        id="new-note-button"
                        className="btn-active"
                        htmlType="submit"
                        type="primary"
                        style={{ height: "100%" }}
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                  <Timeline>
                    {recipe.notes.length > 0 ? (
                      recipe.notes.map((note) => {
                        return (
                          <Timeline.Item color="#d32f2f" key={uuidv4()}>
                            {note}
                          </Timeline.Item>
                        );
                      })
                    ) : (
                      <Timeline.Item color="#d32f2f">
                        <em>This recipe has no notes yet</em>
                      </Timeline.Item>
                    )}
                  </Timeline>
                </>
              ),
            },
            {
              label: `Recipe`,
              key: "3",
              children: (
                <>
                  <Divider orientation="left">
                    <strong>
                      <em>Ingredients:</em>
                    </strong>
                  </Divider>
                  <Timeline>
                    {recipe.ingredients.length > 0 ? (
                      recipe.ingredients.split("\n").map((ingredient) => {
                        return (
                          <Timeline.Item color="#d32f2f" key={uuidv4()}>
                            {ingredient}
                          </Timeline.Item>
                        );
                      })
                    ) : (
                      <Timeline.Item color="#d32f2f">
                        <em>This recipe has no ingredients assigned to it</em>
                      </Timeline.Item>
                    )}
                  </Timeline>
                  <Divider orientation="left">
                    <strong>
                      <em>Steps:</em>
                    </strong>
                  </Divider>
                  <Timeline>
                    {recipe.steps.length > 0 ? (
                      recipe.steps.split("\n").map((step) => {
                        return (
                          <Timeline.Item color="#d32f2f" key={uuidv4()}>
                            {step}
                          </Timeline.Item>
                        );
                      })
                    ) : (
                      <Timeline.Item color="#d32f2f">
                        <em>This recipe has no steps assigned to it</em>
                      </Timeline.Item>
                    )}
                  </Timeline>
                </>
              ),
            },
          ]}
        />
      </Content>
    </Layout>
  ) : (
    <Space direction="vertical" style={{ width: "100%", marginTop: "50px" }}>
      <Spin tip="Loading" size="large" />
    </Space>
  );
};

export default requireAuth(Recipe);
