import React from "react";
import {storiesOf} from "@storybook/react-native";
import {ThemeProvider} from "@yosmy/style";
import {Card} from "@yosmy/ui";
import theme from "../theme";
import icons from "../icons";
import ProveOwnership from "../src/ProveOwnership";

const props = {
    ui: {
        layout: ({padding, progress, children}) => {
            return <Card
                align={{
                    cross: "center"
                }}
                margin={2}
                padding={padding}
                title="Verificación de tarjeta"
                progress={progress}
            >
                {children}
            </Card>
        },
        icons: {
            states: {
                ok: icons.states.ok
            }
        }
    },
    api: {
        card: {
            initOwnership: (card, onReturn, onException) => {
                onReturn();
            },
            proveOwnership: (card, amount, onReturn, onException) => {
                onReturn();
            }
        }
    },
    card: {
        id: "1",
        last4: "1234"
    },
    onProve: () => {}
};

storiesOf("ProveOwnership", module)
    .add("default", () => (
        <ThemeProvider theme={theme}>
            <ProveOwnership
                {...props}
            />
        </ThemeProvider>
    ))
    .add("failure", () => (
        <ThemeProvider theme={theme}>
            <ProveOwnership
                {...props}
                api={{
                    ...props.api,
                    card: {
                        ...props.api.card,
                        initOwnership: (card, onReturn, onException) => {
                            onException({message: "Pago denegado"});
                        }
                    }
                }}
            />
        </ThemeProvider>
    ))
;
