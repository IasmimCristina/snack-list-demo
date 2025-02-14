import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

// Este será o primeiro compennte. Eu usarei como exmeplo com alguns testes já resolvidos.
describe("Greeting component", () => {
  describe("when user is logged in", () => {
    // beforeEach(() => {
    //   render(<Greeting user={{ name: "Iasmim", isLoggedIn: true }} />);
    // });
    // A ideia inicial é não mostrar o before each e apenas apresentá-lo quando eles perceberem que repetimos o render!
    // Alguns testes estarão incompletos.

    it("displays the user name in the greeting message", () => {
      // Setup
      render(<Greeting user={{ name: "Iasmim", isLoggedIn: true }} />);

      // Action
      const greetingMessage = screen.getByRole("heading", {
        name: /Welcome, Iasmim!/i, // explique a diferença entre aspas e barras!
      });

      // Assertion
      expect(greetingMessage).toBeInTheDocument();
    });

    it("displays the description to explore snacks", () => {
      // Šetup
      render(<Greeting user={{ name: "Iasmim", isLoggedIn: true }} />);

      // Action
      const description = screen.getByText(
        /Explore your favorite snacks and add them to your lists below!/i
      );

      // Assertion
      expect(description).toBeInTheDocument();
    });
  });

  // Vamos testar dois principais contextos: log in, log out (basicamente em todos os componentes)
  describe("when user is not logged in", () => {
    beforeEach(() => {
      render(<Greeting user={{ name: "", isLoggedIn: false }} />);
    });

    it("displays the default greeting message", () => {
      const greetingMessage = screen.getByRole("heading", {
        name: /Welcome to SnackList!/i,
      });
      expect(greetingMessage).toBeInTheDocument();
    });

    it("displays the description about snack lists", () => {
      const description = screen.getByText(
        /The best place to get your snacks lists all sorted out!/i
      );
      expect(description).toBeInTheDocument();
    });
  });
});
