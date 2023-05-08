import { types } from "mobx-state-tree";

import BoardsStore from "./boards";

const RootStore = types.model("RootStore", {
    cols: types.optional(BoardsStore, {}),
});

export default RootStore;
