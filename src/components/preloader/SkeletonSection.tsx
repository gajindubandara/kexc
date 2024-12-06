import React from 'react';
import {Card, Skeleton} from 'antd';

interface SkeletonSectionProps {
    numberOfCards: number;
}

const SkeletonSection: React.FC<SkeletonSectionProps> = ({ numberOfCards }) => {
    const skeletonCards = Array.from({ length: numberOfCards }, (_, index) => (
        <div className="col" data-aos="fade-up" key={index}>
                <Card style={{ minHeight: '440px' }}>
                    <div
                        style={{
                            height: '300px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <Skeleton.Image
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>
                    <Skeleton
                        active
                        title={{ width: '60%' }}
                        paragraph={{
                            rows: 3,
                            width: ['100%', '80%', '60%'],
                        }}
                    />
                </Card>
        </div>
    ));

    return (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
            {skeletonCards}
        </div>
    );
};
export default SkeletonSection;
