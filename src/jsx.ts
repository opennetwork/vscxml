export {};

declare global {
  namespace JSX {

    interface CoreAttributes {
      id?: string;
      expr?: string;
    }

    interface SCXMLAttributes {
      xmlns?: never;
      version?: never;
    }

    interface DataModelAttributes extends CoreAttributes {

    }

    interface DataAttributes extends CoreAttributes {
    }

    interface StateAttributes extends CoreAttributes {

    }

    interface TransitionAttributes extends CoreAttributes {
      event?: string;
      target?: string;
    }

    interface AssignAttributes extends CoreAttributes {
      location?: string;
    }

    interface IntrinsicElements {
      scxml: SCXMLAttributes;
      datamodel: DataModelAttributes;
      data: DataAttributes;
      state: StateAttributes;
      transition: TransitionAttributes;
      assign: AssignAttributes;
    }
  }
}
