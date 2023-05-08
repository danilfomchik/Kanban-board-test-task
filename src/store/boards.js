// import { onSnapshot, cast, flow, types } from "mobx-state-tree";
// import { useBoardService } from "../services/useBoardService";

// // const { getIssues } = useBoardService();

// const Assignees = types.model("Assignees", {
//     id: types.integer,
//     login: types.string,
// });

// const Issue = types.model("Issue", {
//     repository_url: types.string,
//     id: types.identifier,
//     title: types.string,
//     user_url: types.string,
//     user_name: types.string,
//     comments: types.integer,
//     state: types.string,
//     assignees: types.array(Assignees),
//     created_at: types.string,
//     number: types.integer,
// });

// // const BoardColumn = types.model("BoardColumn", {
// //     id: types.integer,
// //     title: types.string,
// //     state: types.string,
// //     issues: types.array(Issue),
// // });

// const BoardColumn = types
//     .model("BoardColumn", {
//         id: types.integer,
//         title: types.string,
//         state: types.string,
//         issues: types.array(Issue),
//     })
//     .actions((self) => {
//         return {
//             load: flow(function* () {
//                 const { issues } = yield useBoardService.getIssues(
//                     "https://github.com/facebook/react"
//                 );

//                 self.issues = cast(issues);
//                 onSnapshot(self, self.save);
//             }),
//             afterCreate() {
//                 self.load();
//             },
//         };
//     });

// const BoardsStore = types.model("BoardsStore", {
//     cols: types.array(BoardColumn),
// });

// export default BoardsStore;
