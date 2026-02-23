import { PreviewCard } from ''@/lib/react/preview-card';
import { createRenderer, describeConformance } from '#test-utils';

describe('<PreviewCard.Trigger />', () => {
  const { render } = createRenderer();

  describeConformance(<PreviewCard.Trigger />, () => ({
    refInstanceof: window.HTMLAnchorElement,
    render(node) {
      return render(<PreviewCard.Root open>{node}</PreviewCard.Root>);
    },
  }));
});
