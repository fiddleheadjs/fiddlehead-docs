export let getScrolling = (scrollee, topShift) => {
    if (scrollee === document.documentElement) {
        return {
            height: window.innerHeight - topShift,
            top: topShift,
            scrollHeight: document.documentElement.offsetHeight,
            scrollTop: window.scrollY,
        };
    }

    let scrolleeRect = scrollee.getBoundingClientRect();

    return {
        height: scrolleeRect.height - topShift,
        top: scrolleeRect.top + topShift,
        scrollHeight: scrollee.scrollHeight,
        scrollTop: scrollee.scrollTop,
    };
};

export let getHeadingMixins = (headings, tocContainer) => {
    let headingMixins = [];

    headings.forEach(({id, level}) => {
        let heading = document.getElementById(id);

        if (heading === null) {
            console.error(`Heading not found: ${id}`);
            return;
        }

        let contentBox = heading.firstChild ?? heading;
        let tocItem = tocContainer.querySelector(`li[data-id="${id}"]`);

        headingMixins.push({contentBox, tocItem, level});
    });

    return headingMixins;
};

export let highlightTocItems = (headingMixins, contentsContainer, scrolling, activeAreaPaddingRatio = 0.3) => {
    headingMixins.map(({contentBox: heading, tocItem, level}, index) => {
        let headingRect = heading.getBoundingClientRect();

        // Find next heading with the same or lower level
        // h2 (current) -> h3 (skip) -> h2 (found)
        // h3 (current) -> h3 (skip) -> h2 (found)
        let nextHeading;
        for (let i = index + 1; i < headingMixins.length; i++) {
            if (headingMixins[i].level <= level) {
                nextHeading = headingMixins[i].contentBox;
                break;
            }
        }

        // We expect the content appear at the center area of the screen
        // not too close to top or bottom
        // so 30% of viewport height at top and bottom will be ignore
        // except the case it reaches the top or bottom of scrollee
        let marginTop = Math.min(
            activeAreaPaddingRatio * scrolling.height,
            scrolling.scrollTop
        );
        let marginBottom = Math.min(
            activeAreaPaddingRatio * scrolling.height,
            scrolling.scrollHeight - scrolling.height - scrolling.scrollTop
        );

        // Check if current section is active
        // and calculate section height
        let active, sectionHeight;
        // If there is next heading, we will use the top of the next heading as the bottom border of current section
        if (nextHeading) {
            let nextHeadingRect = nextHeading.getBoundingClientRect();
            sectionHeight = nextHeadingRect.top - headingRect.top;
            active = (
                headingRect.bottom < scrolling.height + scrolling.top - Math.min(marginBottom, sectionHeight)
                && nextHeadingRect.top > scrolling.top + Math.min(marginTop, sectionHeight)
            );
        }
        // If no next heading, we will use the bottom of whole content area instead
        else {
            let contentsRect = contentsContainer.getBoundingClientRect();
            sectionHeight = contentsRect.bottom - headingRect.top + 1;
            active = (
                headingRect.bottom < scrolling.height + scrolling.top - Math.min(marginBottom, sectionHeight)
                && contentsRect.bottom > scrolling.top + Math.min(marginTop, sectionHeight)
            );
        }

        tocItem.setAttribute('data-active', active);

        // Check if current section is focused
        // The difference between focused and active, is that focused is used for child sections
        // If, one of child sections is focused, then parent section is active
        if (!active) {
            tocItem.setAttribute('data-focused', false);
        } else {
            if (index === headingMixins.length - 1) {
                tocItem.setAttribute('data-focused', true);
            } else {
                let siblingHeading = headingMixins[index + 1].contentBox;
                let siblingHeadingRect = siblingHeading.getBoundingClientRect();

                tocItem.setAttribute('data-focused',
                    headingRect.bottom < scrolling.height + scrolling.top - Math.min(marginBottom, sectionHeight)
                    && siblingHeadingRect.top > scrolling.top + Math.min(marginTop, sectionHeight)
                );
            }
        }
    });
};
