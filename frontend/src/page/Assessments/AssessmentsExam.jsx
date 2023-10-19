import React from "react";

import Exam22T1 from "./Exams/Exam22T1";
import Exam22T3 from "./Exams/Exam22T3";
import Exam23T1 from "./Exams/Exam23T1";
import makePage from "../../component/makePage";
import { Context, useContext } from "../../context";

const AssessmentsExam = () => {
	const { getters } = useContext(Context);
	if (getters.term === "22T1") {
		return <Exam22T1 />;
	} else if (getters.term === "22T3") {
		return <Exam22T3 />;
	} else if (getters.term === "23T1") {
		return <Exam23T1 />;
	} else {
		return <>This is a sample exam page!</>;
	}
};

export default makePage(AssessmentsExam, {
	loginRequired: true,
	title: "Exam",
});
