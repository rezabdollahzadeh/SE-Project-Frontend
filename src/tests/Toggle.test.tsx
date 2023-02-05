import { render } from "@testing-library/react";
import Toggle from "../components/Toggle";

test("Renders text inside", () => {
	const { getByText } = render(<Toggle text={"test"} onClick={() => {}} />);
	const linkElement = getByText("test");
	expect(linkElement).toBeInTheDocument();
});

test("Toggles on click", () => {
	const onClick = jest.fn();
	const { getByText } = render(<Toggle text="test" onClick={onClick} />);
	const chk = getByText("test");

	expect(onClick).toHaveBeenCalledTimes(0);
	chk.click();
	expect(onClick).toHaveBeenCalledTimes(1);
});

export {};
