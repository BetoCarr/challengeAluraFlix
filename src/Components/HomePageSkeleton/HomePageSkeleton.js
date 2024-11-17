import React from 'react';
import './HomePageSkeleton.css'

import { Skeleton, Box, Grid } from '@mui/material';

function HomePageSkeleton() {
    return (
        <Box  className='skeleton-container'>
            <Box>
                <Skeleton variant="rectangular" width="18%" height={70} sx={{ marginBottom: '16px' }} />
                <Skeleton variant="rectangular" width="25%" height={90} sx={{ marginBottom: '16px' }} />

            </Box>
            <Box>
                <Grid container spacing={2}>
                    {[1, 2, 3].map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Skeleton variant="rectangular" width="100%" height={180} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
            {/* Video Cards Skeleton */}
        
        </Box>
    );
}

export default HomePageSkeleton;
