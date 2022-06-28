import { v1 as uuidv1 } from "uuid";

export function makeItem(title, description, date, id = null) {
	id = id || uuidv1();
	return { id, title, description, date };
}

export function makeList(title, items = []) {
	const id = uuidv1();
	return { id, title, items };
}

export function getListById(lists, listId) {
	return lists.find((list) => list.id === listId);
}

export function getListByItemId(lists, itemId) {
	return lists.find((list) => list.items.find((item) => item.id === itemId));
}

export function getItemById(lists, itemId) {
	const list = lists.find((list) => list.items.find((item) => item.id === itemId));
	if (list) {
		return list.items.find((item) => item.id === itemId);
	}
}

export function getIndexOfItemById(lists, itemId) {
	const list = lists.find((list) => list.items.find((item) => item.id === itemId));
	if (list) {
		return list.items.findIndex((item) => item.id === itemId);
	}
}
