/** Helper class that binds one Knockout models to a DOM object */
export class BinderService {
	/**
	 * Binds a Knockout model to a DOM object.
	 * @param model Knockout model object.
	 * @param selector Selector of the DOM to apply bindings.
	 */
    public static bind($: JQueryStatic, model: {}, selector: string): void {
        let jqObj: JQuery = $(selector);
        if (jqObj.length === 0) {
            return;
        }

        let domObj: HTMLElement = jqObj[0];
        ko.cleanNode(domObj);
        ko.applyBindings(model, domObj);
    }

    public static isBound($: JQueryStatic, selector: string): boolean {
        let jqObj = $(selector);
        return !!ko.dataFor(jqObj[0]);
    }
}