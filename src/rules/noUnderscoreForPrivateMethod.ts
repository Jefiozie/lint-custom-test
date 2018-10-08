import { tsquery } from "@phenomnomnominal/tsquery";
import { IRuleMetadata, RuleFailure, Rules } from "tslint";
import { SourceFile } from "typescript";

const NO_UNDERSCORE_FOR_PRIVATE_METHOD =
  "MethodDeclaration:has(PrivateKeyword) > Identifier:not([name=/_.*/])";

const FAILURE_MESSAGE = `There should be underscore in the method name.`;

export class Rule extends Rules.AbstractRule {
  public static metadata: IRuleMetadata = {
    ruleName: "enounderscore",
    description: "Ensures that private method starts with underscore.",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: [true],
    hasFix: true,
    type: "style",
    typescriptOnly: false
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
