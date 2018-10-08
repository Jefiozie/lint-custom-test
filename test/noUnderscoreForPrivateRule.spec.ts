import { tsquery } from "@phenomnomnominal/tsquery";
import { expect } from "chai";
import { Rule } from "../src/rules/noUnderscoreForPrivateRule";

describe("noUnderscoreForPrivateMethod", () => {
  it("should create a lint error if private method has no underscore as first char", () => {
    const sourceFile = tsquery.ast(`
        class A {
          private logger(){}
          }`);

    const rule = new Rule({
      ruleArguments: [],
      ruleSeverity: "off",
      disabledIntervals: [],
      ruleName: ""
    });

    const errors = rule.apply(sourceFile);
    const [error] = errors;

    expect(errors.length).to.equal(1);
    expect(error.getFailure()).to.include(
      `There should be underscore in the method name.`
    );
  });

  it("should not create a lint error", () => {
    const sourceFile = tsquery.ast(`
        class A {
          private _logger(){}
          private _QWQoggerA(){}
          }`);

    const rule = new Rule({
      ruleArguments: [],
      ruleSeverity: "off",
      disabledIntervals: [],
      ruleName: ""
    });

    const errors = rule.apply(sourceFile);

    expect(errors.length).to.equal(0);
  });
});
