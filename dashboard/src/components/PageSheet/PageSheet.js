import React from 'react';
import PropTypes from 'prop-types';
import { Card, LoadingState } from '@comba.se/ui';

// Components //
import Tabs from 'components/Tabs';
import SearchHeader from './SearchHeader';

const PageSheet = ({
    activeTab,
    children,
    loading,
    onQueryChange,
    setActiveTab,
    showSearch,
    tabs,
    ...rest
}) => {
    return (
        <Card {...rest}>
            {showSearch ? <SearchHeader onChange={onQueryChange} /> : null}
            {tabs && tabs.length ? (
                <Tabs
                    {...{ tabs }}
                    active={activeTab}
                    onTabClick={setActiveTab}
                />
            ) : null}
            {loading ? <LoadingState /> : children}
        </Card>
    );
};

PageSheet.propTypes = {
    activeTab: PropTypes.string,
    loading: PropTypes.bool,
    onQueryChange: PropTypes.func,
    setActiveTab: PropTypes.func,
    showSearch: PropTypes.bool,
    tabs: PropTypes.array,
};

PageSheet.defaultProps = {
    showSearch: true,
};

export default PageSheet;
