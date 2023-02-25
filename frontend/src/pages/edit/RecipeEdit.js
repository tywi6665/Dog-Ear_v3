import React, { useState, useEffect } from "react";
import requireAuth from "../../utils/RequireAuth";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update_Recipe } from "./RecipeEditActions";
import { titleCase, titleCaseArr } from "../../utils";
import {
  Space,
  Button,
  Checkbox,
  Form,
  Input,
  TreeSelect,
  Rate,
  Tooltip,
  Spin,
  message,
} from "antd";

const RecipeEdit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const recipe = useSelector((state) => state.recipe.recipe);
  const tagOptions = [
    ...useSelector((state) => state.catalog.searchOptions.tags),
  ];
  const navigate = useNavigate();

  const [url, setUrl] = useState(recipe.url);
  const [title, setTitle] = useState(titleCase(recipe.title));
  const [imgSrc, setImgSrc] = useState(recipe.img_src);
  const [description, setDescription] = useState(recipe.description);
  const [author, setAuthor] = useState(recipe.author);
  const [tags, setTags] = useState(titleCaseArr(recipe.tags));
  const [allNotes, setAllNotes] = useState(recipe.notes);
  const [hasMade, setHasMade] = useState(recipe.has_made);
  const [rating, setRating] = useState(recipe.rating);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [steps, setSteps] = useState(recipe.steps);

  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({
      url: url,
      imgSrc: imgSrc,
      title: title,
      author: author,
      description: description,
      tags: tags,
      notes: allNotes,
      hasMade: hasMade,
      rating: rating,
      ingredients: ingredients,
      steps: steps,
    });
  }, [recipe]);

  const displayMessage = (message, type) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 3,
    });
  };

  const updateRecipe = () => {
    let notes = [...allNotes];

    if (notes.length > 0) {
      notes = notes.map((note) => {
        return note.trim();
      });
    } else {
      notes = [];
    }

    const updatedRecipe = {
      url: url,
      img_src: imgSrc,
      title: titleCase(title),
      author: titleCase(author),
      description: description,
      tags: titleCaseArr(tags),
      notes: allNotes,
      has_made: hasMade,
      rating: rating,
      ingredients: ingredients,
      steps: steps,
    };

    update_Recipe(recipe.id, updatedRecipe, navigate, displayMessage);
  };

  return Object.keys(recipe).length ? (
    <Space
      id="recipe-edit"
      direction="vertical"
      size="small"
      style={{ display: "flex", width: "100%" }}
    >
      {contextHolder}
      <Button
        className="btn-active"
        type="primary"
        block
        style={{ marginBottom: "10px" }}
        danger
        onClick={() => navigate(`/catalog/recipe/${recipe.id}`)}
      >
        Cancel
      </Button>
      {imgSrc ? (
        <img src={imgSrc} style={{ maxWidth: "225px", maxHeight: "225px" }} />
      ) : (
        <img src={"./static/graphics/default_image.jpg"} />
      )}
      <Form
        name="form"
        form={form}
        style={{
          width: "100%",
        }}
        labelCol={{ flex: "100px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="Recipe URL"
          name="url"
          //   rules={[
          //     { required: true, message: "Please input the recipe's url!" },
          //   ]}
        >
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Item>

        <Form.Item
          // disabled={isUploading}
          label="Recipe Image"
          style={{ marginBottom: "15px" }}
        >
          <Input
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            placeholder='Right click on image, and click "copy image address". Paste address here.'
          />
        </Form.Item>

        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Form.Item name="hasMade" wrapperCol={{ span: 24 }}>
            <Checkbox
              style={{ marginRight: "15px" }}
              checked={hasMade}
              onClick={() => setHasMade(!hasMade)}
            >
              Has Made?
            </Checkbox>
          </Form.Item>

          <Form.Item name="rating" wrapperCol={{ span: 24 }}>
            <Rate value={rating} onChange={(rating) => setRating(rating)} />
          </Form.Item>
        </div>

        <Form.Item
          label="Recipe Title"
          name="title"
          rules={[
            { required: true, message: "Please input the recipe's title!" },
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Recipe Author" name="author">
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Item>

        <Form.Item label="Recipe Description" name="description">
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 4 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="Recipe Tags" name="tags" wrapperCol={{ span: 12 }}>
          <TreeSelect
            treeData={tagOptions.sort(
              (a, b) => -b.title.localeCompare(a.title)
            )}
            onChange={(tags) => {
              setTags(tags);
            }}
            treeCheckable
            placeholder="Please select"
          />
        </Form.Item>

        <Form.Item label="Recipe Notes" name="notes">
          <Tooltip
            trigger={["focus"]}
            title="Delimit separate notes with ; "
            placement="top"
          >
            <TextArea
              value={allNotes.join(";")}
              onChange={(e) => setAllNotes(e.target.value.split(";"))}
              autoSize
            />
          </Tooltip>
        </Form.Item>

        <Form.Item label="Recipe Ingredients" name="ingredients">
          <Tooltip
            trigger={["focus"]}
            title="Each ingredient needs to be on a new line"
            placement="top"
          >
            <TextArea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item label="Recipe Steps" name="steps">
          <Tooltip
            trigger={["focus"]}
            // title="Each paragraph needs to have an empty line separating them"
            placement="top"
          >
            <TextArea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Tooltip>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className={title.length ? "btn-active" : "btn"}
            disabled={title.length ? false : true}
            onClick={updateRecipe}
            danger
            block
          >
            Update Recipe
          </Button>
        </Form.Item>
      </Form>
    </Space>
  ) : (
    <Space direction="vertical" style={{ width: "100%", marginTop: "50px" }}>
      <Spin tip="Loading" size="large" />
    </Space>
  );
};

export default requireAuth(RecipeEdit);
