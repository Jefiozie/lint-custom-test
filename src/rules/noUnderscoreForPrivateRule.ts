import * as tq from "@phenomnomnominal/tsquery";
import * as Lint from "tslint";
import * as ts from "typescript";

const NO_UNDERSCORE_FOR_PRIVATE_METHOD =
  "MethodDeclaration:has(PrivateKeyword) > Identifier:not([name=/_.*/])";

const FAILURE_MESSAGE = `There should be underscore in the method name.`;

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: "no-underscore-for-private",
    description: "Ensures that private method starts with underscore.",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: [],
    hasFix: false,
    type: "style",
    typescriptOnly: false
  };
  public apply(sourceFile: ts.SourceFile): Array<Lint.RuleFailure> {
    return tq
      .tsquery(sourceFile, NO_UNDERSCORE_FOR_PRIVATE_METHOD)
      .map(result => {
        return new Lint.RuleFailure(
          result.getSourceFile(),
          result.getStart(),
          result.getEnd(),
          FAILURE_MESSAGE,
          this.ruleName
        );
      });
  }
}
