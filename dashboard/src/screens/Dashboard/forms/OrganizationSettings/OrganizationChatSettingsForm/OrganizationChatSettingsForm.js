import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Button, Text } from '@comba.se/ui';
import { Col, Grid, Row } from '@comba.se/ui/Grid';

// Utils //
import request from 'utils/request';

// Hooks //
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'contexts/Snackbar';

// Components //
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';

import validationSchema from './validationSchema';

const Root = styled.form`
    flex: 1;
    & > * + * {
        margin-top: 8px;
    }
`;

const InputInfo = styled.div`
    padding: 12px 12px 4px 12px;
`;

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const FormFooter = styled(Col)`
    margin-top: 24px;
    align-items: flex-end;
`

const renderForm = ({ dirty, handleSubmit, initialValues, isValid, values }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <Grid fluid>
                <Row>
                    <Col>
                        <TitleSeparator title="Chat Defaults" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputInfo>
                            <Text weight="500" size={14} color="primary">Welcome Message</Text>
                            <Text size={12} line={20} faded>The welcome message that will be displayed as soon as a user starts a new thread.</Text>
                        </InputInfo>
                        <InputField multiline name="welcome.message" />
                    </Col>
                    <Col sm={6}>
                        <InputInfo>
                            <Text weight="500" size={14} color="primary">Response</Text>
                            <Text size={12} line={20} faded>The default auto-repsonse message that will send as soon as a user sends their first message.</Text>
                        </InputInfo>
                        <InputField multiline name="response" />
                    </Col>
                </Row>
                <Row>
                    <FormFooter>
                        <Button disabled={!dirty || !isValid} label="Save" type="submit" />
                    </FormFooter>
                </Row>
            </Grid>
        </Root>
    );
};

const OrganizationProfileForm = () => {
    const [{ user, organization }, { refetchCurrentOrg }] = useAuth();
    const { queueSnackbar } = useSnackbar();

    const handleSubmit = useCallback(
        async ({ _id, updatedAt, createdAt, ...values }) => {
            try {
                await request(`v1/organizations/${_id}`, 'put', {
                    body: JSON.stringify(values)
                }, user.tokens.api);
                await refetchCurrentOrg();
                queueSnackbar({
                    isError: false,
                    replace: true,
                    text: "Chat defaults updated! 🥳"
                });
            } catch (error) {
                queueSnackbar({
                    isError: true,
                    replace: true,
                    text: "Something went wrong!"
                });
            }
        },
        [queueSnackbar, user.tokens.api, refetchCurrentOrg]
    );

    return (
        <Formik {...{ validationSchema }} enableReinitialize onSubmit={handleSubmit} initialValues={organization} children={renderForm} />
    )
};



export default OrganizationProfileForm;