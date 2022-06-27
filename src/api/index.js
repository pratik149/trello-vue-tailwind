import { v1 as uuidv1 } from "uuid";
import json from "./data.json";

const data = json.map((list) => ({
	id: uuidv1(),
	title: list.title,
	items: list.items.map((item) => ({
		id: uuidv1(),
		...item,
	})),
}));

export default data;
