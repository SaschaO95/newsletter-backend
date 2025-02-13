import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";

export const newsletter = new Hono();

newsletter.get("/", async (c) => {
  const newsletters = await Newsletter.findAll();

  return c.json(
    {
      data: newsletters,
    },
    200
  );
});

newsletter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const newsletter = await Newsletter.find(id);

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});

newsletter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedNewsletter = await Newsletter.update(id, body);

    if (updatedNewsletter) {
      return c.json(
        { message: "Newsletter updated successfully", data: updatedNewsletter },
        200
      );
    } else {
      return c.text("Newsletter not found or updated failed", 404);
    }
  } catch (error) {
    console.error("Error updating newsletter:", error);
    return c.text("Internal server error", 500);
  }
});

newsletter.post("/", async (c) => {
  const body = await c.req.json();

  try {
    const addedNewsletter = await Newsletter.create(body);
    return c.json(
      { message: "Newsletter created successfully", data: addedNewsletter },
      201
    );
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return c.text("Internal server error", 500);
  }
});

newsletter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedSubscriber = await Newsletter.delete(id);
    if (deletedSubscriber) {
      return c.json(
        {
          message: `Subscriber with ID: ${id} deleted succesfully`,
          data: deletedSubscriber,
        },
        200
      );
    } else {
      return c.text("Subscriber not found", 404);
    }
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return c.text("Internal server error", 500);
  }
});
