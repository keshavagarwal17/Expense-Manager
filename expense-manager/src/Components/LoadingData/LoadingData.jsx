import { Message,Icon } from 'semantic-ui-react'

const LoadingData = () => {
    return (
        <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
            </Message.Content>
        </Message>
    );
}

export default LoadingData;