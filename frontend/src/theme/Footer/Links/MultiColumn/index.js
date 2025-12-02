import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import Icon from 'feather-icons-react';

function ColumnLinkItem({item}) {
  return item.html ? (
    <li
      className={clsx('footer__item', item.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: item.html}}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({column}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        column.className,
      )}>
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn() {
  // Hardcoded columns for the footer
  const columns = [
    {
      title: 'Docs',
      items: [
        { label: 'Book', to: '/docs/introduction' },
      ],
    },
    {
      title: 'Community',
      items: [
        { label: 'Discord', href: 'https://discord.gg/panaverse' },
        { label: 'Twitter', href: 'https://twitter.com/Panaverse_Edu' },
        { label: 'GitHub', href: 'https://github.com/panaverse' },
      ],
    },
    {
      title: 'More',
      items: [
        { label: 'Blog', to: '/blog' },
        { label: 'Panaverse Website', href: 'https://www.panaverse.co/' },
      ],
    },
  ];

  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
