import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_Recipes, add_Recipe } from "./CatalogActions";
import requireAuth from "../../utils/RequireAuth";
import RecipeCard from "../../components/RecipeCard";
import RecipeEntry from "../../components/RecipeEntry";
import { DogIcon } from "../../components/DogIcon";
import { v4 as uuidv4 } from "uuid";
import {
  Layout,
  Col,
  Row,
  Space,
  Spin,
  FloatButton,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const Catalog = () => {
  const dispatch = useDispatch();
  const { Header, Content } = Layout;
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryType, setEntryType] = useState("");

  const recipes = useSelector((state) => state.catalog.recipes);

  useEffect(() => {
    get_Recipes(dispatch, displayMessage);
  }, []);

  const handleAddRecipe = (recipe) => {
    recipe.unique_id = uuidv4();
    add_Recipe(recipe, dispatch, displayMessage);
    closeModal();
  };

  const displayMessage = (message, type) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 3,
    });
  };

  // Modal Functions
  const showModal = (type) => {
    document.body.style.overflow = "hidden";
    setEntryType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
    setEntryType("");
  };

  return (
    <>
      <Layout id="layout" style={{ minHeight: "100%" }}>
        {contextHolder}
        <Content
          style={{
            margin: "15px",
          }}
        >
          <Row
            justify="space-around"
            xs="auto"
            gutter={[16, 16]}
            key={uuidv4()}
          >
            {recipes.length ? (
              recipes.map((recipe, i) => (
                <Col
                  flex
                  xs={{ span: 12, offset: 0 }}
                  md={{ span: 8, offset: 0 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 4, offset: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={uuidv4()}
                >
                  <RecipeCard
                    recipe={recipe}
                    //   recipeNumber={i}
                    //   quickTagOptions={searchOptions.tags}
                    //   updateRecipe={handleUpdate}
                    //   setFocusedRecipe={setFocusedRecipe}
                    //   showDrawer={showDrawer}
                    key={uuidv4()}
                  />
                </Col>
              ))
            ) : (
              <Space
                direction="vertical"
                style={{ width: "100%", marginTop: "50px" }}
              >
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </Space>
            )}
          </Row>
          <Row>
            {recipes ? (
              <p style={{ margin: "25px auto" }}>
                <em>You have saved {recipes.length} recipes to date!</em>
              </p>
            ) : null}
          </Row>
          <FloatButton.Group
            icon={<PlusCircleOutlined />}
            style={{ bottom: "85px" }}
            type="primary"
            trigger="click"
          >
            <FloatButton
              icon={<DogIcon />}
              //   onClick={() => showModal("crawl")}
              tooltip={<div>Scrape a Recipe</div>}
            />
            <FloatButton
              onClick={(e) => [
                // setIsSubmitted(true),
                showModal("blank"),
                // connect("blank"),
              ]}
              tooltip={<div>Blank Template</div>}
            />
          </FloatButton.Group>
          <FloatButton.BackTop
            style={{ bottom: "25px" }}
            tooltip={<div>Back to Top</div>}
          />
        </Content>
      </Layout>
      <Modal
        title={"Blank Recipe Template"}
        closable
        destroyOnClose
        footer={null}
        style={{ top: 20 }}
        open={isModalOpen}
        onCancel={() => [closeModal()]}
      >
        <div>
          <RecipeEntry
            //   recipe={crawledRecipe}
            //   key={crawledRecipe.unique_id}
            //   unique_id={crawledRecipe.unique_id}
            //   url={url}
            //   setRecipe={setCrawledRecipe}
            //   setIsSubmitted={setIsSubmitted}
            //   handleCreate={handleCreate}
            //   // handleImageUpload={handleImageUpload}
            //   // handleImageDelete={handleImageDelete}
            //   handleDelete={handleDelete}
            //   setUrl={setUrl}
            //   quickTagOptions={searchOptions.tags}
            handleAddRecipe={handleAddRecipe}
            type={entryType}
            setType={setEntryType}
            closeModal={closeModal}
            // isUploading={isUploading}
            // setIsUploading={setIsUploading}
            // imageName={imageName}
            // setImageName={setImageName}
          />
        </div>
      </Modal>
    </>
  );
};

export default requireAuth(Catalog);
