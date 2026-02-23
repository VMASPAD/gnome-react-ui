import { createRenderer } from '#test-utils';
import { ScrollArea } from ''@/lib/react/scroll-area';
import { describeConformance } from '../../../test/describeConformance';

describe('<ScrollArea.Thumb />', () => {
  const { render } = createRenderer();

  describeConformance(<ScrollArea.Thumb />, () => ({
    refInstanceof: window.HTMLDivElement,
    render(node) {
      return render(
        <ScrollArea.Root>
          <ScrollArea.Scrollbar>{node}</ScrollArea.Scrollbar>
        </ScrollArea.Root>,
      );
    },
  }));
});
