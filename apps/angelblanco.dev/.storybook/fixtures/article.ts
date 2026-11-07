import type { Line } from './shiki';
import { h } from 'vue';
import ProseCustomStrong from '../../app/components/prose/ProseCustomStrong.global.vue';
import { tocFixture } from './blog';
import { shikiBlock } from './shiki';

const tocLinks = tocFixture.links.flatMap(link => [
  link,
  ...(link.children ?? []),
]);

export const articleHeadingIds = [
  'support-dates-at-a-glance',
  'whats-new-in-php-85',
  'what-changed-goodbye-ppa-hello-packagessuryorg',
  'the-easy-way',
  'the-step-by-step-guide',
  '_1-install-the-prerequisites',
  'the-script',
];

const pipeLines: Line[] = [
  [
    ['text', '$slug = $title'],
  ],
  [
    ['text', '    |> trim(...)'],
  ],
  [
    ['text', '    |> (fn (string $str): string => str_replace(\' \', \'-\', $str))'],
  ],
  [
    ['text', '    |> strtolower(...);'],
  ],
];

const removePpaLines: Line[] = [
  [
    ['blue', 'sudo'],
    ['text', ' '],
    ['green', 'add-apt-repository'],
    ['text', ' '],
    ['green', '--remove'],
    ['text', ' '],
    ['green', 'ppa:ondrej/php'],
  ],
];

const easyWayLines: Line[] = [
  [
    ['blue', 'curl'],
    ['text', ' '],
    ['green', '-fsSL'],
    ['text', ' '],
    ['green', 'https://angelblanco.dev/scripts/ubuntu-install-php-85.sh'],
    ['text', ' '],
    ['teal', '|'],
    ['text', ' '],
    ['blue', 'bash'],
  ],
];

const prerequisitesLines: Line[] = [
  [
    ['blue', 'sudo'],
    ['text', ' '],
    ['green', 'apt'],
    ['text', ' '],
    ['green', 'update'],
  ],
  [
    ['blue', 'sudo'],
    ['text', ' '],
    ['green', 'apt'],
    ['text', ' '],
    ['green', 'install'],
    ['text', ' '],
    ['green', '-y'],
    ['text', ' '],
    ['green', 'ca-certificates'],
    ['text', ' '],
    ['green', 'curl'],
    ['text', ' '],
    ['green', 'unzip'],
  ],
];

const scriptLines: Line[] = [
  [
    ['pink', '#!/bin/bash'],
  ],
  [
    ['overlay2', '#'],
  ],
  [
    ['overlay2', '# Author: Ángel Blanco'],
  ],
  [
    ['overlay2', '# License: MIT'],
  ],
  [
    ['overlay2', '#'],
  ],
  [
    ['overlay2', '# This script is provided "as is", without warranty of any kind. Use at your own risk.'],
  ],
  [
    ['overlay2', '#'],
  ],
  [
    ['overlay2', '# Source: https://angelblanco.dev/blog/apt-install-php-85-on-ubuntu-26'],
  ],
];

export const articleCodeBlocks = [
  pipeLines,
  removePpaLines,
  easyWayLines,
  prerequisitesLines,
  scriptLines,
];

export const articleScriptFilename = 'ubuntu-install-php-85.sh';

const supportDates = [
  [
    '8.2',
    'Dec 8, 2022',
    'Dec 31, 2024',
    'Dec 31, 2026',
  ],
  [
    '8.3',
    'Nov 23, 2023',
    'Dec 31, 2025',
    'Dec 31, 2027',
  ],
  [
    '8.4',
    'Nov 21, 2024',
    'Dec 31, 2026',
    'Dec 31, 2028',
  ],
  [
    '8.5',
    'Nov 20, 2025',
    'Dec 31, 2027',
    'Dec 31, 2029',
  ],
];

function heading(id: string) {
  const link = tocLinks.find(link => link.id === id)!;
  return h(`h${link.depth}`, { id }, link.text);
}

function code(text: string) {
  return h('code', text);
}

function link(href: string, text: string) {
  return h('a', { href }, text);
}

export function articleBody() {
  return [
    h('p', [
      'Yesterday I posted how to ',
      link('/blog/apt-install-node-26-on-ubuntu-26/', 'install Node.js 26 with apt'),
      ' so the operating system keeps it patched after October\'s security releases. Today it\'s PHP\'s turn, for the same reason: security breaches keep coming, and PHP has had its fair share.',
    ]),
    h('p', [
      'If you want the full upstream release, the easiest way is still to let the operating system handle it. Install PHP with ',
      code('apt'),
      ' from ',
      link('https://deb.sury.org/', 'Ondřej Surý\'s repository'),
      ', the same packages that have powered PHP on Debian and Ubuntu for more than a decade, and let ',
      code('sudo apt upgrade'),
      ' take care of the rest.',
    ]),
    heading('support-dates-at-a-glance'),
    h('p', [
      'Each PHP branch gets two years of active support followed by two years of security-only fixes. This is where things stand according to the ',
      link('https://www.php.net/supported-versions.php', 'official supported versions page'),
      ':',
    ]),
    h('table', [
      h('thead', h('tr', [
        'Version',
        'Released',
        'Active support until',
        'Security support until',
      ].map(cell => h('th', cell)))),
      h('tbody', supportDates.map(row => h('tr', row.map(cell => h('td', cell))))),
    ]),
    heading('whats-new-in-php-85'),
    h('p', [
      'If you\'re coming from PHP 8.4 or older, here are a few reasons to upgrade beyond security. The ',
      link('https://www.php.net/releases/8.5/en.php', 'release announcement'),
      ' has the full list, but my favorites are:',
    ]),
    h('ul', [
      h('li', 'The pipe operator, to chain callables from left to right without temporary variables.'),
      h('li', [
        code('clone()'),
        ' with properties, which turns the "with-er" pattern for ',
        code('readonly'),
        ' classes into one line.',
      ]),
      h('li', [
        'The ',
        code('#[\\NoDiscard]'),
        ' attribute, which warns when someone ignores a return value that matters.',
      ]),
      h('li', [
        'A native URI extension, with URL parsing that follows RFC 3986 and WHATWG, no more ',
        code('parse_url()'),
        ' surprises.',
      ]),
      h('li', [
        code('array_first()'),
        ' and ',
        code('array_last()'),
        '. Finally.',
      ]),
    ]),
    h('p', 'Here\'s the pipe operator turning a title into a slug:'),
    shikiBlock(pipeLines, { language: 'php' }),
    heading('what-changed-goodbye-ppa-hello-packagessuryorg'),
    h('p', [
      'If you\'ve installed PHP on Ubuntu before, you probably ran ',
      code('add-apt-repository ppa:ondrej/php'),
      '. That\'s no longer the way to go: Ondřej Surý is moving his Ubuntu packages from ',
      link('https://launchpad.net/~ondrej/+archive/ubuntu/php', 'Launchpad'),
      ' to ',
      link('https://packages.sury.org/php/', 'packages.sury.org'),
      ', the server that already hosts the Debian ones. The ',
      code('resolute'),
      ' packages for Ubuntu 26.04 are ',
      h(ProseCustomStrong, null, {
        default: () => 'only',
      }),
      ' published there.',
    ]),
    h('p', [
      'If you still have the PPA configured, you may have seen ',
      code('apt update'),
      ' complain this summer that the repository changed its \'Label\' value, an error that made ',
      code('apt-get update'),
      ' fail in scripts until you accepted the change. For now the PPA still gets updates for Ubuntu 22.04 and 24.04, but it\'s being merged into packages.sury.org. And if both are configured, apt keeps preferring the PPA builds, so remove it before following the steps below:',
    ]),
    shikiBlock(removePpaLines, { language: 'bash' }),
    heading('the-easy-way'),
    h('p', [
      'As usual, you can install everything with a single command. The script adds the Sury repository, installs PHP 8.5 with the most common extensions, makes it the default ',
      code('php'),
      ', and optionally installs ',
      link('https://getcomposer.org/', 'Composer'),
      '.',
    ]),
    shikiBlock(easyWayLines, { language: 'bash' }),
    h('p', [
      'The script asks for confirmation at each major step. As always, read ',
      link('#the-script', 'the script'),
      ' before you pipe it into ',
      code('bash'),
      '. Trusting random URLs with ',
      code('sudo'),
      ' is a great way to learn about incident response.',
    ]),
    heading('the-step-by-step-guide'),
    h('p', 'Here\'s what the script does, in case you want to run it step by step.'),
    heading('_1-install-the-prerequisites'),
    shikiBlock(prerequisitesLines, { language: 'bash' }),
    h('p', [
      'PHP doesn\'t need ',
      code('unzip'),
      ', but Composer uses it to extract packages much faster than its PHP fallback.',
    ]),
    heading('the-script'),
    h('p', [
      'This is the complete script. It includes confirmations, uses a temporary directory that is removed on exit, and reads your answers from the terminal, so it works when you pipe it from ',
      code('curl'),
      '. You can change the PHP version and the extensions with the variables at the top.',
    ]),
    shikiBlock(scriptLines, { language: 'bash', filename: articleScriptFilename }),
  ];
}
