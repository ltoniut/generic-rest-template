declare const _default: {
    $schema: string;
    id: string;
    title: string;
    questions: ({
        type: string;
        name: string;
        message: string;
        default: boolean;
        when?: undefined;
        choices?: undefined;
        validate?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        when: (answers: any) => boolean;
        default: string;
        choices?: undefined;
        validate?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        choices: {
            name: string;
            value: number;
        }[];
        default?: undefined;
        when?: undefined;
        validate?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        when: (answers: any) => boolean;
        validate: (value: any) => true | "File not found" | "Please enter a valid file path";
        default?: undefined;
        choices?: undefined;
    } | {
        type: string;
        name: string;
        message: string;
        when: (answers: any) => boolean;
        validate: (value: any) => true | "Please enter an Entity name";
        default?: undefined;
        choices?: undefined;
    })[];
};
export default _default;
