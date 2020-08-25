import { ObjectLiteral } from '../shared/objectLiteral';

/** Helper class that gets the name of an object */
export class ClassNaming {
	/**
	 * returns the name of the class providing an instance
	 * @param inputClass
	 */
    public static getName(inputClass: ObjectLiteral): string {

        let funcNameRegex = /function (.{1,})\(/;
        const results = (funcNameRegex).exec(inputClass.constructor.toString());

        return (results !== null && results.length > 1) ? results[1] : "";
    }
}