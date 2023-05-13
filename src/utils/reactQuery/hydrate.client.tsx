/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query';

function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />;
}

export default Hydrate;
