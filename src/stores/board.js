import { defineStore } from "pinia";
import { getItemById, getListById, getListByItemId } from "../utils/board";
import { makeItem, makeList } from "../utils/board";
import data from "../api/data.json";
export const useBoardStore = defineStore({
	id: "board",
	state: () => ({
		lists: data,
	}),
	getters: {
		getListById: (state) => (listId) => {
			return getListById(state.lists, listId);
		},
		getListByItemId: (state) => (itemId) => {
			return getListByItemId(state.lists, itemId);
		},
		getItemById: (state) => (itemId) => {
			return getItemById(state.lists, itemId);
		},
	},
	actions: {
		addList({ title }) {
			this.lists.push(makeList(title));
		},
		removeList({ listId }) {
			const index = this.lists.findIndex((list) => list.id === listId);
			this.lists.splice(index, 1);
		},
		addItem({ listId, title, description, date }) {
			const list = getListById(this.lists, listId);
			list.items.push(makeItem(title, description, date, null));
		},
		updateItem({ itemId, title, description, date }) {
			const item = getItemById(this.lists, itemId);
			if (item) {
				Object.assign(item, makeItem(title, description, date, itemId));
			}
		},
		removeItem({ itemId }) {
			const list = getListByItemId(this.lists, itemId);
			list.items.splice(
				list.items.findIndex((item) => item.id === itemId),
				1
			);
		},
	},
});
