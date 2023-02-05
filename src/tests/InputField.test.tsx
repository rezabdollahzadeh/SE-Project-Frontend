import { render } from "@testing-library/react";
import InputField from "components/InputField";
import SearchField from "components/SearchField";

test("Renders text inside", () => {
	const { getByText } = render(
		<InputField name="test_name" placeholder="test_placeholder" />
	);
	const linkElement = getByText("test_name");
	expect(linkElement).toBeInTheDocument();
});

export {};
