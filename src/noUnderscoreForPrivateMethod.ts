// Dependencies:
import { tsquery } from "@phenomnomnominal/tsquery";
import { RuleFailure, Rules, IRuleMetadata } from "tslint";
import { SourceFile } from "typescript";

const NO_UNDERSCORE_FOR_PRIVATE_METHOD =
  "MethodDeclaration:has(PrivateKeyword) > Identifier:not([name=/_.*/])";

const FAILURE_MESSAGE = `There should be underscore in the method name.`;

export class Rule extends Rules.AbstractRule {
  static metadata: IRuleMetadata = {
    ruleName: "e-no-underscore",
    description: `Should have a underscore`,
    rationale: "",
    options: null,
    optionsDescription: "",
    type: "style",
    typescriptOnly: true
  };
  public apply(sourceFile: SourceFile): Array<RuleFailure> {
    return tsquery(sourceFile, NO_UNDERSCORE_FOR_PRIVATE_METHOD).map(result => {
      return new RuleFailure(
        result.getSourceFile(),
        result.getStart(),
        result.getEnd(),
        FAILURE_MESSAGE,
        this.ruleName
      );
    });
  }
}
