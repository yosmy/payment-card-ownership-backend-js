import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {resolve} from "@yosmy/resolution";
import {Container, Error, Input, LinePlaceholder, SecondaryButton, Text} from "@yosmy/ui";

const ManageOwnership = ({
    ui, api, card
}) => {
    const [ownership, setOwnership] = useState(null);

    const [execution, setExecution] = useState({
        progress: false
    });

    useEffect(() => {
        setExecution({
            progress: true
        });

        api.pickOwnership(
            card
        )
            .then((ownership) => {
                setOwnership(ownership);

                setExecution({
                    progress: false
                });
            })
            .catch((e) => {
                switch (e) {
                    case "nonexistent-ownership":
                        setOwnership(false);

                        setExecution({
                            progress: false
                        });

                        break;
                    default:
                        console.log(222);

                        throw e;
                }
            })
    }, [api]);

    if (ownership === null) {
        return <ui.layout progress={execution.progress}>
            <LinePlaceholder />
        </ui.layout>;
    }

    if (ownership && ownership.proved) {
        return <ui.layout progress={execution.progress}>
            <Text>Verificada</Text>
        </ui.layout>;
    }

    return <ui.layout
        progress={execution.progress}
    >
        <Container
            flow="row"
        >
            {ownership === false
                ? <Text>Sin verificar</Text>
                : <Text>Verificando</Text>
            }
            <ApproveOwnership
                ui={{
                    layout: ({children}) => {
                        return <Container
                            margin={{
                                left: 1
                            }}
                        >
                            {children}
                        </Container>
                    }
                }}
                onApprove={(reason) => {
                    api.approveOwnership(
                        card,
                        reason,
                        // onReturn
                        (ownership) => {
                            setOwnership(ownership);
                        }
                    );
                }}
            />
        </Container>
    </ui.layout>
};

ManageOwnership.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired,
    }).isRequired,
    api: PropTypes.shape({
        pickOwnership: PropTypes.func.isRequired,
        approveOwnership: PropTypes.func.isRequired
    }).isRequired,
    card: PropTypes.string.isRequired,
};

const ApproveOwnership = ({ui, onApprove}) => {
    const [url, setUrl] = useState(
        {
            location: "/start",
            payload: {}
        }
    );

    const [execution, setExecution] = useState({
        progress: false,
        error: null
    });

    const [reason, setReason] = useState(null);

    return <ui.layout>
        {resolve(
            url.location,
            [
                {
                    location: /^\/start/,
                    element: () => {
                        return <SecondaryButton
                            onClick={() => {
                                setUrl({
                                    location: "/finish",
                                    payload: {}
                                });
                            }}
                        >
                            <Text>Verificar a mano</Text>
                        </SecondaryButton>
                    },
                },
                {
                    location: /^\/finish/,
                    element: () => {
                        return <Container
                            flow="row"
                            align={{
                                main: "flex-start",
                                cross: "flex-start"
                            }}
                        >
                            <Container>
                                <Input
                                    value={reason}
                                    placeholder="Escribe el motivo"
                                    onChange={(value) => {
                                        setReason(value);
                                    }}
                                />
                                {execution.error && <Error>{execution.error}</Error>}
                            </Container>
                            <SecondaryButton
                                margin={{
                                    left: 2
                                }}
                                onClick={() => {
                                    if (!reason) {
                                        setExecution((prev) => {
                                            return {
                                                ...prev,
                                                error: "Escribe el motivo"
                                            };
                                        });

                                        return;
                                    }

                                    setExecution({
                                        progress: true,
                                        error: null
                                    });

                                    onApprove(reason);
                                }}
                            >
                                <Text>Verificar</Text>
                            </SecondaryButton>
                        </Container>
                    },
                }
            ]
        )}
    </ui.layout>;
};

ApproveOwnership.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired,
    }).isRequired,
    onApprove: PropTypes.func.isRequired // (reason)
};

export default ManageOwnership;