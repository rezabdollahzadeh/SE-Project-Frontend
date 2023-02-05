import { render } from "@testing-library/react";
import Button from "../components/Button";

test("Renders text inside", () => {
	const { getByText } = render(<Button text={"test"} onClick={() => {}} />);
	const linkElement = getByText("test");
	expect(linkElement).toBeInTheDocument();
});

test("Renders notifications", () => {
	const notification = 123;

	const { getByText } = render(
		<Button text={"test"} onClick={() => {}} notification={notification} />
	);
	const linkElement = getByText(notification);
	expect(linkElement).toBeInTheDocument();
});

test("Runs onClick function", () => {
	const onClick = jest.fn();
	const { getByText } = render(<Button text="test" onClick={onClick} />);
	const btn = getByText("test");
	btn.click();
	expect(onClick).toHaveBeenCalledTimes(1);

	btn.click();
	expect(onClick).toHaveBeenCalledTimes(2);
});

export {};
