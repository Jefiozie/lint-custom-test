import * as tq from "@phenomnomnominal/tsquery";
import * as ts from "typescript";
import * as Lint from "tslint";

const NO_SERVICE_INTERFACE = `ClassDeclaration:has(Decorator > CallExpression > Identifier[name="Injectable"]):not(:has(HeritageClause:has(ExpressionWithTypeArguments:has(Identifier[name=/I.*/]))))`;
const FAILURE_MESSAGE = `There should be a interface for this class.`;

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: "no-service-interface",
    description: "Ensures that a service always has a interface.",
    optionsDescription: "Not configurable.",
    options: null,
    optionExamples: [true],
    hasFix: false,
    type: "style",
    typescriptOnly: false
  };
  public apply(sourceFile: ts.SourceFile): Array<Lint.RuleFailure> {
    return tq.tsquery(sourceFile, NO_SERVICE_INTERFACE).map(result => {
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
