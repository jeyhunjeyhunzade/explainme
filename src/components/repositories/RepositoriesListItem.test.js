import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A javascript library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return {
    repository,
  };
}

test("shows a link to a github repository", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: /javascript/i });

  const link = await screen.findByRole("link", { name: /github repository/i });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a fileicon with appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: /javascript/i });
  expect(icon).toHaveClass("js-icon");
});

test("shows a link to code editor page", async () => {
  const { repository } = renderComponent();

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
