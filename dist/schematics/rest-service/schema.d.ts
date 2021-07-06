declare const _default: {
    $schema: string;
    id: string;
    title: string;
    questions: ({
        type: string;
        name: string;
        message: string;
        validate: (value: any) => true | "Please enter a name for the project";
        default?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        default: string;
        validate?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        validate?: undefined;
        default?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        default: number;
        validate?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        default: boolean;
        validate?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        validate: (value: any) => true | "Please enter RDS Hostname";
        when: (answers: any) => any;
        default: string;
    } | {
        type: string;
        name: string;
        message: string;
        validate: (value: any) => true | "Please enter RDS Username";
        default?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        validate: (value: any) => true | "Please enter RDS Password";
        default?: undefined;
        when?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        validate: (value: any) => true | "Please enter RDS Database Name";
        when: (answers: any) => any;
        default: string;
    } | {
        type: string;
        name: string;
        message: string;
        when: (answers: any) => any;
        default: number;
        validate?: undefined;
    })[];
};
export default _default;
