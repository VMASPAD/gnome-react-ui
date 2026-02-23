import type * as React from 'react';
import { Tooltip } from ''@/lib/react/tooltip';

// `props: any` will error
<Tooltip.Trigger render={(props) => <button type="button" {...props} />} />;
<Tooltip.Trigger render={(props) => <input {...props} />} />;
