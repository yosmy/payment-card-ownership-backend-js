import React from 'react';
import {ThemeProvider} from "@yosmy/style";
import {EmptyLayout} from "@yosmy/ui";
import theme from "../Theme";

import ManageOwnership from '../ManageOwnership';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  title: 'ManageOwnership',
  component: ManageOwnership,
};

const defaultApi = {
    approveOwnership: async (card, user, reason) => {
        return {
            card: "card-1",
            proved: true
        };
    }
};

const Template = ({api}) => {
    return <ThemeProvider theme={theme}>
        <ManageOwnership
            ui={{
                layout: EmptyLayout,
            }}
            api={{
                ...defaultApi,
                ...api,
            }}
            card="card-1"
            user="user-1"
        />
    </ThemeProvider>
};

export const Proved = Template.bind({});
Proved.args = {
    api: {
        pickOwnership: async (card) => {
            await delay(3000);

            return {
                card: "card-1",
                proved: true,
            };
        }
    }
};

export const NotProved = Template.bind({});
NotProved.args = {
    api: {
        pickOwnership: async (card) => {
            await delay(3000);

            return {
                card: "card-1",
                proved: false,
            };
        }
    }
};

export const Nonexistent = Template.bind({});
Nonexistent.args = {
    api: {
        pickOwnership: async (card) => {
            throw "nonexistent-ownership";
        }
    }
};
