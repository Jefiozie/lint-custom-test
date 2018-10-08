import { tsquery } from "@phenomnomnominal/tsquery";
import { expect } from "chai";
import { Rule } from "../src/rules/noServiceInterfaceRule";

describe("noUnderscoreForPrivateMethod", () => {
  it("should create a lint error when service does not have interface", () => {
    const sourceFile = tsquery.ast(`
        @Injectable()
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
      `There should be a interface for this class.`
    );
  });

  it("should not create a lint error when service does have interface declaration starting with a I", () => {
    const sourceFile = tsquery.ast(`
        @Injectable()
        class A implements IA {
          private logger(){}
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
