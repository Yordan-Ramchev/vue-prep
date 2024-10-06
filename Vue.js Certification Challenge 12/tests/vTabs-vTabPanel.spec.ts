import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import vTabs from "../src/components/vTabs.vue";
import vTabPanel from "../src/components/vTabPanel.vue";

const wrapperConfig = {
  components: {
    vTabs,
    vTabPanel,
  },
  template: `<div><vTabs>
      <vTabPanel title="Tab 1">
        <p>Tab 1 Content</p>
      </vTabPanel>
      <vTabPanel title="Tab 2">
        <p>Tab 2 Content</p>
      </vTabPanel>
      <vTabPanel title="Tab 3">
        <p>Tab 3 Content</p>
      </vTabPanel>
    </vTabs></div>
  `,
};

describe("the use of vTabsPanel with vTabs", () => {
  it("renders the tab titles", async () => {
    const tabsComponent = mount(wrapperConfig, {
      attachTo: document.body,
    });

    await tabsComponent.vm.$nextTick();

    // Get all titles
    const titleEls = tabsComponent.findAll(`[data-test="tab-title"]`);

    expect(titleEls.length).toBe(3);
    expect(titleEls[0].text()).toBe("Tab 1");
    expect(titleEls[1].text()).toBe("Tab 2");
    expect(titleEls[2].text()).toBe("Tab 3");
  });

  it("renders the tab panel content", async () => {
    const tabsComponent = mount(wrapperConfig, {
      attachTo: document.body,
    });

    await tabsComponent.vm.$nextTick();

    const contentEls = tabsComponent.findAll(`[data-test="tab-content"`);

    expect(contentEls.length).toBe(3);
    expect(contentEls[0].text()).toBe("Tab 1 Content");
    expect(contentEls[1].text()).toBe("Tab 2 Content");
    expect(contentEls[2].text()).toBe("Tab 3 Content");
  });

  it("only shows the content for the active panel", async () => {
    const tabsComponent = mount(wrapperConfig, {
      attachTo: document.body,
    });

    await tabsComponent.vm.$nextTick();

    const firstPanel = tabsComponent.find(
      `[data-test="tab-content"]:nth-child(1)`,
    );

    const secondPanel = tabsComponent.find(
      `[data-test="tab-content"]:nth-child(2)`,
    );

    expect(firstPanel.isVisible()).toBe(true);
    expect(secondPanel.isVisible()).toBe(false);
  });

  it("switches the content based on the tab clicked", async () => {
    const wrapper = mount(wrapperConfig, {
      attachTo: document.body,
    });

    await wrapper.vm.$nextTick();

    // clicking the second tab reveals the second content
    // and hides the first content
    await wrapper.find(`[data-test="tab-title"]:nth-child(2)`).trigger("click");
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find(`[data-test="tab-content"]:nth-child(2)`).isVisible(),
    ).toBe(true);
    expect(
      wrapper.find(`[data-test="tab-content"]:nth-child(1)`).isVisible(),
    ).toBe(false);

    // clicking the third tab reveals the third content
    //  and hides the second content
    await wrapper.find(`[data-test="tab-title"]:nth-child(3)`).trigger("click");
    await wrapper.vm.$nextTick();
    expect(
      wrapper.find(`[data-test="tab-content"]:nth-child(3)`).isVisible(),
    ).toBe(true);
    expect(
      wrapper.find(`[data-test="tab-content"]:nth-child(2)`).isVisible(),
    ).toBe(false);
  });
});
