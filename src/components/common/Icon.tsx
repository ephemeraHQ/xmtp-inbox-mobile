import React, {FC} from 'react';
import {SvgProps} from 'react-native-svg';
export type IconName =
  | 'academic-cap'
  | 'adjustments-horizontal'
  | 'archive-box'
  | 'archive-box-arrow-down'
  | 'archive-box-x-mark'
  | 'arrow-down'
  | 'arrow-down-circle'
  | 'arrow-down-left'
  | 'arrow-down-on-square'
  | 'arrow-down-on-square-stack'
  | 'arrow-down-right'
  | 'arrow-down-tray'
  | 'arrow-left'
  | 'arrow-left-circle'
  | 'arrow-left-on-rectangle'
  | 'arrow-long-down'
  | 'arrow-long-left'
  | 'arrow-long-right'
  | 'arrow-long-up'
  | 'arrow-path'
  | 'arrow-path-rounded-square'
  | 'arrow-right'
  | 'arrow-right-circle'
  | 'arrow-right-circle-1'
  | 'arrow-right-circle-thick'
  | 'arrow-right-on-rectangle'
  | 'arrow-small-down'
  | 'arrow-small-down-1'
  | 'arrow-small-left'
  | 'arrow-small-left-1'
  | 'arrow-small-right'
  | 'arrow-small-right-1'
  | 'arrow-small-up'
  | 'arrow-small-up-1'
  | 'arrow-small-up-thick'
  | 'arrow-top-right-on-square'
  | 'arrow-trending-down'
  | 'arrow-trending-up'
  | 'arrow-up'
  | 'arrow-up-circle'
  | 'arrow-up-left'
  | 'arrow-up-on-square'
  | 'arrow-up-on-square-stack'
  | 'arrow-up-right'
  | 'arrow-up-thick'
  | 'arrow-up-tray'
  | 'arrow-uturn-down'
  | 'arrow-uturn-left'
  | 'arrow-uturn-right'
  | 'arrow-uturn-up'
  | 'arrows-pointing-in'
  | 'arrows-pointing-out'
  | 'arrows-right-left'
  | 'arrows-up-down'
  | 'at-symbol'
  | 'backspace'
  | 'backward'
  | 'banknotes'
  | 'bars-2'
  | 'bars-3'
  | 'bars-3-bottom-left'
  | 'bars-3-bottom-right'
  | 'bars-3-center-left'
  | 'bars-4'
  | 'bars-arrow-down'
  | 'bars-arrow-up'
  | 'battery-0'
  | 'battery-100'
  | 'battery-50'
  | 'beaker'
  | 'bell'
  | 'bell-slash'
  | 'bell-snooze'
  | 'bolt'
  | 'bolt-slash'
  | 'book-open'
  | 'bookmark'
  | 'bookmark-slash'
  | 'bookmark-square'
  | 'briefcase'
  | 'bug-ant'
  | 'building-library'
  | 'building-office'
  | 'building-office-2'
  | 'building-storefront'
  | 'cake'
  | 'calculator'
  | 'calendar'
  | 'calendar-days'
  | 'camera'
  | 'chart-bar'
  | 'chart-bar-square'
  | 'chart-pie'
  | 'chat-bubble-bottom-center'
  | 'chat-bubble-bottom-center-text'
  | 'chat-bubble-left'
  | 'chat-bubble-left-ellipsis'
  | 'chat-bubble-left-right'
  | 'chat-bubble-oval-left'
  | 'chat-bubble-oval-left-ellipsis'
  | 'check'
  | 'check-badge'
  | 'check-circle'
  | 'check-thick'
  | 'chevron-double-down'
  | 'chevron-double-left'
  | 'chevron-double-right'
  | 'chevron-double-up'
  | 'chevron-down'
  | 'chevron-down-thick'
  | 'chevron-left'
  | 'chevron-left-thick'
  | 'chevron-right'
  | 'chevron-right-thick'
  | 'chevron-up'
  | 'chevron-up-down'
  | 'circle-stack'
  | 'clipboard'
  | 'clipboard-document'
  | 'clipboard-document-check'
  | 'clipboard-document-list'
  | 'clock'
  | 'cloud'
  | 'cloud-arrow-down'
  | 'cloud-arrow-up'
  | 'code-bracket'
  | 'code-bracket-square'
  | 'cog'
  | 'cog-6-tooth'
  | 'cog-8-tooth'
  | 'command-line'
  | 'computer-desktop'
  | 'cpu-chip'
  | 'credit-card'
  | 'cube'
  | 'cube-transparent'
  | 'currency-bangladeshi'
  | 'currency-dollar'
  | 'currency-euro'
  | 'currency-pound'
  | 'currency-rupee'
  | 'currency-yen'
  | 'cursor-arrow-rays'
  | 'cursor-arrow-ripple'
  | 'device-phone-mobile'
  | 'device-tablet'
  | 'document'
  | 'document-arrow-down'
  | 'document-arrow-up'
  | 'document-chart-bar'
  | 'document-check'
  | 'document-duplicate'
  | 'document-magnifying-glass'
  | 'document-minus'
  | 'document-plus'
  | 'document-text'
  | 'ellipsis-horizontal'
  | 'ellipsis-horizontal-circle'
  | 'ellipsis-vertical'
  | 'ens'
  | 'envelope'
  | 'envelope-open'
  | 'ethereum'
  | 'exclaimation-circle'
  | 'exclamation-triangle'
  | 'eye'
  | 'eye-dropper'
  | 'eye-slash'
  | 'face-frown'
  | 'face-smile'
  | 'film'
  | 'finger-print'
  | 'fire'
  | 'flag'
  | 'folder'
  | 'folder-arrow-down'
  | 'folder-minus'
  | 'folder-open'
  | 'folder-plus'
  | 'forward'
  | 'funnel'
  | 'gif'
  | 'gift'
  | 'gift-top'
  | 'globe-alt'
  | 'globe-americas'
  | 'globe-asia-australia'
  | 'globe-europe-africa'
  | 'hand-raised'
  | 'hand-thumb-down'
  | 'hand-thumb-up'
  | 'hashtag'
  | 'heart'
  | 'home'
  | 'home-modern'
  | 'identification'
  | 'inbox'
  | 'inbox-arrow-down'
  | 'inbox-stack'
  | 'information-circle'
  | 'key'
  | 'language'
  | 'lens'
  | 'lifebuoy'
  | 'light-bulb'
  | 'link'
  | 'list-bullet'
  | 'lock-closed'
  | 'lock-open'
  | 'magnifying-glass'
  | 'magnifying-glass-circle'
  | 'magnifying-glass-minus'
  | 'magnifying-glass-plus'
  | 'map'
  | 'map-pin'
  | 'megaphone'
  | 'microphone'
  | 'minus'
  | 'minus-circle'
  | 'minus-small'
  | 'minus-small-1'
  | 'moon'
  | 'musical-note'
  | 'newspaper'
  | 'no-symbol'
  | 'paint-brush'
  | 'paper-airplane'
  | 'paper-clip'
  | 'pause'
  | 'pause-circle'
  | 'pencil'
  | 'pencil-square'
  | 'phone'
  | 'phone-arrow-down-left'
  | 'phone-arrow-up-right'
  | 'phone-x-mark'
  | 'photo'
  | 'play'
  | 'play-circle'
  | 'play-pause'
  | 'plus'
  | 'plus-circle'
  | 'plus-small'
  | 'plus-small-1'
  | 'plus-thick'
  | 'power'
  | 'presentation-chart-bar'
  | 'presentation-chart-line'
  | 'printer'
  | 'puzzle-piece'
  | 'qr-code'
  | 'question-mark-circle'
  | 'queue-list'
  | 'radio'
  | 'receipt-percent'
  | 'receipt-refund'
  | 'rectangle-group'
  | 'rectangle-stack'
  | 'rocket-launch'
  | 'rss'
  | 'scale'
  | 'scissors'
  | 'server'
  | 'server-stack'
  | 'share'
  | 'shield-check'
  | 'shield-exclamation'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'signal'
  | 'signal-slash'
  | 'sparkles'
  | 'speaker-wave'
  | 'speaker-x-mark'
  | 'square-2-stack'
  | 'square-3-stack-3d'
  | 'squares-2x2'
  | 'squares-plus'
  | 'star'
  | 'stop'
  | 'stop-circle'
  | 'sun'
  | 'swatch'
  | 'table-cells'
  | 'tag'
  | 'ticket'
  | 'trash'
  | 'trophy'
  | 'truck'
  | 'tv'
  | 'user'
  | 'user-circle'
  | 'user-group'
  | 'user-minus'
  | 'user-plus'
  | 'users'
  | 'variable'
  | 'video-camera'
  | 'video-camera-slash'
  | 'view-columns'
  | 'viewfinder-dot'
  | 'wallet'
  | 'wifi'
  | 'window'
  | 'wrench'
  | 'wrench-screwdriver'
  | 'x-circle'
  | 'x-mark';

type IconType = 'mini' | 'outline' | 'solid';

const iconSet = new Set<IconName>([
  'academic-cap',
  'adjustments-horizontal',
  'archive-box',
  'archive-box-arrow-down',
  'archive-box-x-mark',
  'arrow-down',
  'arrow-down-circle',
  'arrow-down-left',
  'arrow-down-on-square',
  'arrow-down-on-square-stack',
  'arrow-down-right',
  'arrow-down-tray',
  'arrow-left',
  'arrow-left-circle',
  'arrow-left-on-rectangle',
  'arrow-long-down',
  'arrow-long-left',
  'arrow-long-right',
  'arrow-long-up',
  'arrow-path',
  'arrow-path-rounded-square',
  'arrow-right',
  'arrow-right-circle',
  'arrow-right-circle-1',
  'arrow-right-circle-thick',
  'arrow-right-on-rectangle',
  'arrow-small-down',
  'arrow-small-down-1',
  'arrow-small-left',
  'arrow-small-left-1',
  'arrow-small-right',
  'arrow-small-right-1',
  'arrow-small-up',
  'arrow-small-up-1',
  'arrow-small-up-thick',
  'arrow-top-right-on-square',
  'arrow-trending-down',
  'arrow-trending-up',
  'arrow-up',
  'arrow-up-circle',
  'arrow-up-left',
  'arrow-up-on-square',
  'arrow-up-on-square-stack',
  'arrow-up-right',
  'arrow-up-thick',
  'arrow-up-tray',
  'arrow-uturn-down',
  'arrow-uturn-left',
  'arrow-uturn-right',
  'arrow-uturn-up',
  'arrows-pointing-in',
  'arrows-pointing-out',
  'arrows-right-left',
  'arrows-up-down',
  'at-symbol',
  'backspace',
  'backward',
  'banknotes',
  'bars-2',
  'bars-3',
  'bars-3-bottom-left',
  'bars-3-bottom-right',
  'bars-3-center-left',
  'bars-4',
  'bars-arrow-down',
  'bars-arrow-up',
  'battery-0',
  'battery-100',
  'battery-50',
  'beaker',
  'bell',
  'bell-slash',
  'bell-snooze',
  'bolt',
  'bolt-slash',
  'book-open',
  'bookmark',
  'bookmark-slash',
  'bookmark-square',
  'briefcase',
  'bug-ant',
  'building-library',
  'building-office',
  'building-office-2',
  'building-storefront',
  'cake',
  'calculator',
  'calendar',
  'calendar-days',
  'camera',
  'chart-bar',
  'chart-bar-square',
  'chart-pie',
  'chat-bubble-bottom-center',
  'chat-bubble-bottom-center-text',
  'chat-bubble-left',
  'chat-bubble-left-ellipsis',
  'chat-bubble-left-right',
  'chat-bubble-oval-left',
  'chat-bubble-oval-left-ellipsis',
  'check',
  'check-badge',
  'check-circle',
  'check-thick',
  'chevron-double-down',
  'chevron-double-left',
  'chevron-double-right',
  'chevron-double-up',
  'chevron-down',
  'chevron-down-thick',
  'chevron-left',
  'chevron-left-thick',
  'chevron-right',
  'chevron-right-thick',
  'chevron-up',
  'chevron-up-down',
  'circle-stack',
  'clipboard',
  'clipboard-document',
  'clipboard-document-check',
  'clipboard-document-list',
  'clock',
  'cloud',
  'cloud-arrow-down',
  'cloud-arrow-up',
  'code-bracket',
  'code-bracket-square',
  'cog',
  'cog-6-tooth',
  'cog-8-tooth',
  'command-line',
  'computer-desktop',
  'cpu-chip',
  'credit-card',
  'cube',
  'cube-transparent',
  'currency-bangladeshi',
  'currency-dollar',
  'currency-euro',
  'currency-pound',
  'currency-rupee',
  'currency-yen',
  'cursor-arrow-rays',
  'cursor-arrow-ripple',
  'device-phone-mobile',
  'device-tablet',
  'document',
  'document-arrow-down',
  'document-arrow-up',
  'document-chart-bar',
  'document-check',
  'document-duplicate',
  'document-magnifying-glass',
  'document-minus',
  'document-plus',
  'document-text',
  'ellipsis-horizontal',
  'ellipsis-horizontal-circle',
  'ellipsis-vertical',
  'ens',
  'envelope',
  'envelope-open',
  'ethereum',
  'exclaimation-circle',
  'exclamation-triangle',
  'eye',
  'eye-dropper',
  'eye-slash',
  'face-frown',
  'face-smile',
  'film',
  'finger-print',
  'fire',
  'flag',
  'folder',
  'folder-arrow-down',
  'folder-minus',
  'folder-open',
  'folder-plus',
  'forward',
  'funnel',
  'gif',
  'gift',
  'gift-top',
  'globe-alt',
  'globe-americas',
  'globe-asia-australia',
  'globe-europe-africa',
  'hand-raised',
  'hand-thumb-down',
  'hand-thumb-up',
  'hashtag',
  'heart',
  'home',
  'home-modern',
  'identification',
  'inbox',
  'inbox-arrow-down',
  'inbox-stack',
  'information-circle',
  'key',
  'language',
  'lens',
  'lifebuoy',
  'light-bulb',
  'link',
  'list-bullet',
  'lock-closed',
  'lock-open',
  'magnifying-glass',
  'magnifying-glass-circle',
  'magnifying-glass-minus',
  'magnifying-glass-plus',
  'map',
  'map-pin',
  'megaphone',
  'microphone',
  'minus',
  'minus-circle',
  'minus-small',
  'minus-small-1',
  'moon',
  'musical-note',
  'newspaper',
  'no-symbol',
  'paint-brush',
  'paper-airplane',
  'paper-clip',
  'pause',
  'pause-circle',
  'pencil',
  'pencil-square',
  'phone',
  'phone-arrow-down-left',
  'phone-arrow-up-right',
  'phone-x-mark',
  'photo',
  'play',
  'play-circle',
  'play-pause',
  'plus',
  'plus-circle',
  'plus-small',
  'plus-small-1',
  'plus-thick',
  'power',
  'presentation-chart-bar',
  'presentation-chart-line',
  'printer',
  'puzzle-piece',
  'qr-code',
  'question-mark-circle',
  'queue-list',
  'radio',
  'receipt-percent',
  'receipt-refund',
  'rectangle-group',
  'rectangle-stack',
  'rocket-launch',
  'rss',
  'scale',
  'scissors',
  'server',
  'server-stack',
  'share',
  'shield-check',
  'shield-exclamation',
  'shopping-bag',
  'shopping-cart',
  'signal',
  'signal-slash',
  'sparkles',
  'speaker-wave',
  'speaker-x-mark',
  'square-2-stack',
  'square-3-stack-3d',
  'squares-2x2',
  'squares-plus',
  'star',
  'stop',
  'stop-circle',
  'sun',
  'swatch',
  'table-cells',
  'tag',
  'ticket',
  'trash',
  'trophy',
  'truck',
  'tv',
  'user',
  'user-circle',
  'user-group',
  'user-minus',
  'user-plus',
  'users',
  'variable',
  'video-camera',
  'video-camera-slash',
  'view-columns',
  'viewfinder-dot',
  'wallet',
  'wifi',
  'window',
  'wrench',
  'wrench-screwdriver',
  'x-circle',
  'x-mark',
]);

const getIcon = (name: IconName, type: IconType) => {
  switch (name) {
    case 'academic-cap':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-academic-cap.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-academic-cap.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-academic-cap.svg').default;
      }

    case 'adjustments-horizontal':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-adjustments-horizontal.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-adjustments-horizontal.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-adjustments-horizontal.svg')
          .default;
      }

    case 'archive-box':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-archive-box.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-archive-box.svg').default;
      } else {
        return require('../../../assets/icons/solid-archive-box.svg').default;
      }

    case 'archive-box-arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-archive-box-arrow-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-archive-box-arrow-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-archive-box-arrow-down.svg')
          .default;
      }

    case 'archive-box-x-mark':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-archive-box-x-mark.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-archive-box-x-mark.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-archive-box-x-mark.svg')
          .default;
      }

    case 'arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down.svg').default;
      } else {
        return require('../../../assets/icons/solid-arrow-down.svg').default;
      }

    case 'arrow-down-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-down-circle.svg')
          .default;
      }

    case 'arrow-down-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-down-left.svg')
          .default;
      }

    case 'arrow-down-on-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down-on-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down-on-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-down-on-square.svg')
          .default;
      }

    case 'arrow-down-on-square-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down-on-square-stack.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down-on-square-stack.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-down-on-square-stack.svg')
          .default;
      }

    case 'arrow-down-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-down-right.svg')
          .default;
      }

    case 'arrow-down-tray':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-down-tray.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-down-tray.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-down-tray.svg')
          .default;
      }

    case 'arrow-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-left.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-left.svg').default;
      } else {
        return require('../../../assets/icons/solid-arrow-left.svg').default;
      }

    case 'arrow-left-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-left-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-left-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-left-circle.svg')
          .default;
      }

    case 'arrow-left-on-rectangle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-left-on-rectangle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-left-on-rectangle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-left-on-rectangle.svg')
          .default;
      }

    case 'arrow-long-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-long-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-long-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-long-down.svg')
          .default;
      }

    case 'arrow-long-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-long-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-long-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-long-left.svg')
          .default;
      }

    case 'arrow-long-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-long-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-long-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-long-right.svg')
          .default;
      }

    case 'arrow-long-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-long-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-long-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-long-up.svg').default;
      }

    case 'arrow-path':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-path.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-path.svg').default;
      } else {
        return require('../../../assets/icons/solid-arrow-path.svg').default;
      }

    case 'arrow-path-rounded-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-path-rounded-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-path-rounded-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-path-rounded-square.svg')
          .default;
      }

    case 'arrow-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-right.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-right.svg').default;
      } else {
        return require('../../../assets/icons/solid-arrow-right.svg').default;
      }

    case 'arrow-right-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-right-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-right-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-right-circle.svg')
          .default;
      }

    case 'arrow-right-circle-1':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-right-circle-1.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-right-circle-1.svg')
          .default;
      }

    case 'arrow-right-circle-thick':
      return require('../../../assets/icons/outline-arrow-right-circle-thick.svg')
        .default;

    case 'arrow-right-on-rectangle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-right-on-rectangle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-right-on-rectangle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-right-on-rectangle.svg')
          .default;
      }

    case 'arrow-small-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-small-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/outline-arrow-small-down.svg')
          .default;
      }

    case 'arrow-small-down-1':
      return require('../../../assets/icons/outline-arrow-small-down-1.svg')
        .default;

    case 'arrow-small-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-small-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/outline-arrow-small-left.svg')
          .default;
      }

    case 'arrow-small-left-1':
      return require('../../../assets/icons/outline-arrow-small-left-1.svg')
        .default;

    case 'arrow-small-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-small-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/outline-arrow-small-right.svg')
          .default;
      }

    case 'arrow-small-right-1':
      return require('../../../assets/icons/outline-arrow-small-right-1.svg')
        .default;

    case 'arrow-small-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-small-up.svg').default;
      } else {
        return require('../../../assets/icons/outline-arrow-small-up.svg')
          .default;
      }

    case 'arrow-small-up-1':
      return require('../../../assets/icons/outline-arrow-small-up-1.svg')
        .default;

    case 'arrow-small-up-thick':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-small-up-thick.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-small-up-thick.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-small-up-thick.svg')
          .default;
      }

    case 'arrow-top-right-on-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-top-right-on-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-top-right-on-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-top-right-on-square.svg')
          .default;
      }

    case 'arrow-trending-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-trending-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-trending-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-trending-down.svg')
          .default;
      }

    case 'arrow-trending-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-trending-up.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-trending-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-trending-up.svg')
          .default;
      }

    case 'arrow-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up.svg').default;
      } else {
        return require('../../../assets/icons/solid-arrow-up.svg').default;
      }

    case 'arrow-up-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-circle.svg')
          .default;
      }

    case 'arrow-up-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-left.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-left.svg').default;
      }

    case 'arrow-up-on-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-on-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-on-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-on-square.svg')
          .default;
      }

    case 'arrow-up-on-square-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-on-square-stack.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-on-square-stack.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-on-square-stack.svg')
          .default;
      }

    case 'arrow-up-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-right.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-right.svg')
          .default;
      }

    case 'arrow-up-thick':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-thick.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-thick.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-thick.svg')
          .default;
      }

    case 'arrow-up-tray':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-up-tray.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-up-tray.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-up-tray.svg').default;
      }

    case 'arrow-uturn-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-uturn-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-uturn-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-uturn-down.svg')
          .default;
      }

    case 'arrow-uturn-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-uturn-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-uturn-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-uturn-left.svg')
          .default;
      }

    case 'arrow-uturn-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-uturn-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-uturn-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-uturn-right.svg')
          .default;
      }

    case 'arrow-uturn-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrow-uturn-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrow-uturn-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrow-uturn-up.svg')
          .default;
      }

    case 'arrows-pointing-in':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrows-pointing-in.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrows-pointing-in.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrows-pointing-in.svg')
          .default;
      }

    case 'arrows-pointing-out':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrows-pointing-out.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrows-pointing-out.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrows-pointing-out.svg')
          .default;
      }

    case 'arrows-right-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrows-right-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrows-right-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrows-right-left.svg')
          .default;
      }

    case 'arrows-up-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-arrows-up-down.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-arrows-up-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-arrows-up-down.svg')
          .default;
      }

    case 'at-symbol':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-at-symbol.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-at-symbol.svg').default;
      } else {
        return require('../../../assets/icons/solid-at-symbol.svg').default;
      }

    case 'backspace':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-backspace.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-backspace.svg').default;
      } else {
        return require('../../../assets/icons/solid-backspace.svg').default;
      }

    case 'backward':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-backward.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-backward.svg').default;
      } else {
        return require('../../../assets/icons/solid-backward.svg').default;
      }

    case 'banknotes':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-banknotes.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-banknotes.svg').default;
      } else {
        return require('../../../assets/icons/solid-banknotes.svg').default;
      }

    case 'bars-2':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-2.svg').default;
      } else {
        return require('../../../assets/icons/outline-bars-2.svg').default;
      }

    case 'bars-3':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-3.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-3.svg').default;
      } else {
        return require('../../../assets/icons/solid-bars-3.svg').default;
      }

    case 'bars-3-bottom-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-3-bottom-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-3-bottom-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bars-3-bottom-left.svg')
          .default;
      }

    case 'bars-3-bottom-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-3-bottom-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-3-bottom-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bars-3-bottom-right.svg')
          .default;
      }

    case 'bars-3-center-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-3-center-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-3-center-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bars-3-center-left.svg')
          .default;
      }

    case 'bars-4':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-4.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-4.svg').default;
      } else {
        return require('../../../assets/icons/solid-bars-4.svg').default;
      }

    case 'bars-arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-arrow-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-arrow-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bars-arrow-down.svg')
          .default;
      }

    case 'bars-arrow-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bars-arrow-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bars-arrow-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bars-arrow-up.svg').default;
      }

    case 'battery-0':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-battery-0.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-battery-0.svg').default;
      } else {
        return require('../../../assets/icons/solid-battery-0.svg').default;
      }
    // Repeat for all icons
    case 'battery-100':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-battery-100.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-battery-100.svg').default;
      } else {
        return require('../../../assets/icons/solid-battery-100.svg').default;
      }
    case 'battery-50':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-battery-50.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-battery-50.svg').default;
      } else {
        return require('../../../assets/icons/solid-battery-50.svg').default;
      }
    case 'beaker':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-beaker.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-beaker.svg').default;
      } else {
        return require('../../../assets/icons/solid-beaker.svg').default;
      }
    case 'bell':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bell.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bell.svg').default;
      } else {
        return require('../../../assets/icons/solid-bell.svg').default;
      }
    case 'bell-slash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bell-slash.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bell-slash.svg').default;
      } else {
        return require('../../../assets/icons/solid-bell-slash.svg').default;
      }
    case 'bell-snooze':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bell-snooze.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bell-snooze.svg').default;
      } else {
        return require('../../../assets/icons/solid-bell-snooze.svg').default;
      }
    case 'bolt':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bolt.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bolt.svg').default;
      } else {
        return require('../../../assets/icons/solid-bolt.svg').default;
      }
    case 'bolt-slash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bolt-slash.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bolt-slash.svg').default;
      } else {
        return require('../../../assets/icons/solid-bolt-slash.svg').default;
      }
    case 'book-open':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-book-open.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-book-open.svg').default;
      } else {
        return require('../../../assets/icons/solid-book-open.svg').default;
      }
    case 'bookmark':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bookmark.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bookmark.svg').default;
      } else {
        return require('../../../assets/icons/solid-bookmark.svg').default;
      }
    case 'bookmark-slash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bookmark-slash.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bookmark-slash.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bookmark-slash.svg')
          .default;
      }
    case 'bookmark-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bookmark-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bookmark-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-bookmark-square.svg')
          .default;
      }
    case 'briefcase':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-briefcase.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-briefcase.svg').default;
      } else {
        return require('../../../assets/icons/solid-briefcase.svg').default;
      }
    case 'bug-ant':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-bug-ant.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-bug-ant.svg').default;
      } else {
        return require('../../../assets/icons/solid-bug-ant.svg').default;
      }
    case 'building-library':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-building-library.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-building-library.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-building-library.svg')
          .default;
      }
    case 'building-office':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-building-office.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-building-office.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-building-office.svg')
          .default;
      }
    case 'building-office-2':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-building-office-2.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-building-office-2.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-building-office-2.svg')
          .default;
      }
    case 'building-storefront':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-building-storefront.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-building-storefront.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-building-storefront.svg')
          .default;
      }
    case 'cake':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cake.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cake.svg').default;
      } else {
        return require('../../../assets/icons/solid-cake.svg').default;
      }
    case 'calculator':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-calculator.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-calculator.svg').default;
      } else {
        return require('../../../assets/icons/solid-calculator.svg').default;
      }
    case 'calendar':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-calendar.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-calendar.svg').default;
      } else {
        return require('../../../assets/icons/solid-calendar.svg').default;
      }
    case 'calendar-days':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-calendar-days.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-calendar-days.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-calendar-days.svg').default;
      }
    case 'camera':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-camera.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-camera.svg').default;
      } else {
        return require('../../../assets/icons/solid-camera.svg').default;
      }
    case 'chart-bar':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chart-bar.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chart-bar.svg').default;
      } else {
        return require('../../../assets/icons/solid-chart-bar.svg').default;
      }
    case 'chart-bar-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chart-bar-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chart-bar-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chart-bar-square.svg')
          .default;
      }
    case 'chart-pie':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chart-pie.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chart-pie.svg').default;
      } else {
        return require('../../../assets/icons/solid-chart-pie.svg').default;
      }
    case 'chat-bubble-bottom-center':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-bottom-center.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-bottom-center.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-bottom-center.svg')
          .default;
      }
    case 'chat-bubble-bottom-center-text':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-bottom-center-text.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-bottom-center-text.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-bottom-center-text.svg')
          .default;
      }
    case 'chat-bubble-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-left.svg')
          .default;
      }
    case 'chat-bubble-left-ellipsis':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-left-ellipsis.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-left-ellipsis.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-left-ellipsis.svg')
          .default;
      }
    case 'chat-bubble-left-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-left-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-left-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-left-right.svg')
          .default;
      }
    case 'chat-bubble-oval-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-oval-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-oval-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-oval-left.svg')
          .default;
      }
    case 'chat-bubble-oval-left-ellipsis':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chat-bubble-oval-left-ellipsis.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chat-bubble-oval-left-ellipsis.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chat-bubble-oval-left-ellipsis.svg')
          .default;
      }
    case 'check':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-check.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-check.svg').default;
      } else {
        return require('../../../assets/icons/solid-check.svg').default;
      }
    case 'check-badge':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-check-badge.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-check-badge.svg').default;
      } else {
        return require('../../../assets/icons/solid-check-badge.svg').default;
      }
    case 'check-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-check-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-check-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-check-circle.svg').default;
      }
    case 'check-thick':
      if (type === 'outline') {
        return require('../../../assets/icons/outline-check-thick.svg').default;
      } else {
        return require('../../../assets/icons/solid-check-thick.svg').default;
      }
    case 'chevron-double-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-double-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-double-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-double-down.svg')
          .default;
      }
    case 'chevron-double-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-double-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-double-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-double-left.svg')
          .default;
      }
    case 'chevron-double-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-double-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-double-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-double-right.svg')
          .default;
      }
    case 'chevron-double-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-double-up.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-double-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-double-up.svg')
          .default;
      }
    case 'chevron-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-down.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-down.svg').default;
      }
    case 'chevron-down-thick':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-down-thick.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-down-thick.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-down-thick.svg')
          .default;
      }
    case 'chevron-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-left.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-left.svg').default;
      }
    case 'chevron-left-thick':
      if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-left-thick.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-left-thick.svg')
          .default;
      }
    case 'chevron-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-right.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-right.svg').default;
      }
    case 'chevron-right-thick':
      if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-right-thick.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-right-thick.svg')
          .default;
      }
    case 'chevron-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-up.svg').default;
      } else {
        return require('../../../assets/icons/solid-chevron-up.svg').default;
      }
    case 'chevron-up-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-chevron-up-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-chevron-up-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-chevron-up-down.svg')
          .default;
      }
    case 'circle-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-circle-stack.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-circle-stack.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-circle-stack.svg').default;
      }
    case 'clipboard':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-clipboard.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-clipboard.svg').default;
      } else {
        return require('../../../assets/icons/solid-clipboard.svg').default;
      }
    case 'clipboard-document':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-clipboard-document.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-clipboard-document.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-clipboard-document.svg')
          .default;
      }
    case 'clipboard-document-check':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-clipboard-document-check.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-clipboard-document-check.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-clipboard-document-check.svg')
          .default;
      }
    case 'clipboard-document-list':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-clipboard-document-list.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-clipboard-document-list.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-clipboard-document-list.svg')
          .default;
      }
    case 'clock':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-clock.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-clock.svg').default;
      } else {
        return require('../../../assets/icons/solid-clock.svg').default;
      }
    case 'cloud':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cloud.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cloud.svg').default;
      } else {
        return require('../../../assets/icons/solid-cloud.svg').default;
      }
    case 'cloud-arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cloud-arrow-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cloud-arrow-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-cloud-arrow-down.svg')
          .default;
      }
    case 'cloud-arrow-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cloud-arrow-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cloud-arrow-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-cloud-arrow-up.svg')
          .default;
      }
    case 'code-bracket':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-code-bracket.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-code-bracket.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-code-bracket.svg').default;
      }
    case 'code-bracket-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-code-bracket-square.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-code-bracket-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-code-bracket-square.svg')
          .default;
      }
    case 'cog':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cog.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cog.svg').default;
      } else {
        return require('../../../assets/icons/solid-cog.svg').default;
      }
    case 'cog-6-tooth':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cog-6-tooth.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cog-6-tooth.svg').default;
      } else {
        return require('../../../assets/icons/solid-cog-6-tooth.svg').default;
      }
    case 'cog-8-tooth':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cog-8-tooth.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cog-8-tooth.svg').default;
      } else {
        return require('../../../assets/icons/solid-cog-8-tooth.svg').default;
      }
    case 'command-line':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-command-line.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-command-line.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-command-line.svg').default;
      }
    case 'computer-desktop':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-computer-desktop.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-computer-desktop.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-computer-desktop.svg')
          .default;
      }
    case 'cpu-chip':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cpu-chip.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cpu-chip.svg').default;
      } else {
        return require('../../../assets/icons/solid-cpu-chip.svg').default;
      }
    case 'credit-card':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-credit-card.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-credit-card.svg').default;
      } else {
        return require('../../../assets/icons/solid-credit-card.svg').default;
      }
    case 'cube':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cube.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cube.svg').default;
      } else {
        return require('../../../assets/icons/solid-cube.svg').default;
      }
    case 'cube-transparent':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cube-transparent.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cube-transparent.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-cube-transparent.svg')
          .default;
      }
    case 'currency-bangladeshi':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-currency-bangladeshi.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-currency-bangladeshi.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-currency-bangladeshi.svg')
          .default;
      }
    case 'currency-dollar':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-currency-dollar.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-currency-dollar.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-currency-dollar.svg')
          .default;
      }
    case 'currency-euro':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-currency-euro.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-currency-euro.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-currency-euro.svg').default;
      }
    case 'currency-pound':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-currency-pound.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-currency-pound.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-currency-pound.svg')
          .default;
      }
    case 'currency-rupee':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-currency-rupee.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-currency-rupee.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-currency-rupee.svg')
          .default;
      }
    case 'currency-yen':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-currency-yen.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-currency-yen.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-currency-yen.svg').default;
      }
    case 'cursor-arrow-rays':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cursor-arrow-rays.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cursor-arrow-rays.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-cursor-arrow-rays.svg')
          .default;
      }
    case 'cursor-arrow-ripple':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-cursor-arrow-ripple.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-cursor-arrow-ripple.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-cursor-arrow-ripple.svg')
          .default;
      }
    case 'device-phone-mobile':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-device-phone-mobile.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-device-phone-mobile.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-device-phone-mobile.svg')
          .default;
      }
    case 'device-tablet':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-device-tablet.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-device-tablet.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-device-tablet.svg').default;
      }
    case 'document':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-document.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-document.svg').default;
      } else {
        return require('../../../assets/icons/solid-document.svg').default;
      }
    case 'document-arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-document-arrow-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-document-arrow-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-document-arrow-down.svg')
          .default;
      }
    case 'document-arrow-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-document-arrow-up.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-document-arrow-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-document-arrow-up.svg')
          .default;
      }
    case 'document-check':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-document-check.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-document-check.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-document-check.svg')
          .default;
      }
    case 'document-text':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-document-text.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-document-text.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-document-text.svg').default;
      }
    case 'envelope':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-envelope.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-envelope.svg').default;
      } else {
        return require('../../../assets/icons/solid-envelope.svg').default;
      }
    case 'envelope-open':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-envelope-open.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-envelope-open.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-envelope-open.svg').default;
      }
    case 'ens':
      return require('../../../assets/icons/ens.svg').default;
    case 'ethereum':
      return require('../../../assets/icons/ethereum.svg').default;
    case 'exclaimation-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-exclaimation-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-exclaimation-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-exclaimation-circle.svg')
          .default;
      }
    case 'exclamation-triangle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-exclamation-triangle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-exclamation-triangle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-exclamation-triangle.svg')
          .default;
      }
    case 'eye':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-eye.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-eye.svg').default;
      } else {
        return require('../../../assets/icons/solid-eye.svg').default;
      }
    case 'eye-dropper':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-eye-dropper.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-eye-dropper.svg').default;
      } else {
        return require('../../../assets/icons/solid-eye-dropper.svg').default;
      }
    case 'eye-slash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-eye-slash.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-eye-slash.svg').default;
      } else {
        return require('../../../assets/icons/solid-eye-slash.svg').default;
      }
    case 'face-frown':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-face-frown.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-face-frown.svg').default;
      } else {
        return require('../../../assets/icons/solid-face-frown.svg').default;
      }
    case 'face-smile':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-face-smile.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-face-smile.svg').default;
      } else {
        return require('../../../assets/icons/solid-face-smile.svg').default;
      }
    case 'film':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-film.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-film.svg').default;
      } else {
        return require('../../../assets/icons/solid-film.svg').default;
      }
    case 'finger-print':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-finger-print.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-finger-print.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-finger-print.svg').default;
      }

    case 'fire':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-fire.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-fire.svg').default;
      } else {
        return require('../../../assets/icons/solid-fire.svg').default;
      }

    case 'flag':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-flag.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-flag.svg').default;
      } else {
        return require('../../../assets/icons/solid-flag.svg').default;
      }

    case 'folder':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-folder.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-folder.svg').default;
      } else {
        return require('../../../assets/icons/solid-folder.svg').default;
      }

    case 'folder-arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-folder-arrow-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-folder-arrow-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-folder-arrow-down.svg')
          .default;
      }

    case 'folder-minus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-folder-minus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-folder-minus.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-folder-minus.svg').default;
      }

    case 'folder-open':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-folder-open.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-folder-open.svg').default;
      } else {
        return require('../../../assets/icons/solid-folder-open.svg').default;
      }

    case 'folder-plus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-folder-plus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-folder-plus.svg').default;
      } else {
        return require('../../../assets/icons/solid-folder-plus.svg').default;
      }

    case 'forward':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-forward.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-forward.svg').default;
      } else {
        return require('../../../assets/icons/solid-forward.svg').default;
      }

    case 'funnel':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-funnel.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-funnel.svg').default;
      } else {
        return require('../../../assets/icons/solid-funnel.svg').default;
      }

    case 'gif':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-gif.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-gif.svg').default;
      } else {
        return require('../../../assets/icons/solid-gif.svg').default;
      }

    case 'gift':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-gift.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-gift.svg').default;
      } else {
        return require('../../../assets/icons/solid-gift.svg').default;
      }

    case 'gift-top':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-gift-top.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-gift-top.svg').default;
      } else {
        return require('../../../assets/icons/solid-gift-top.svg').default;
      }

    case 'globe-alt':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-globe-alt.svg').default;
      } else {
        return require('../../../assets/icons/solid-globe-alt.svg').default;
      }

    case 'globe-americas':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-globe-americas.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-globe-americas.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-globe-americas.svg')
          .default;
      }

    case 'globe-asia-australia':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-globe-asia-australia.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-globe-asia-australia.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-globe-asia-australia.svg')
          .default;
      }

    case 'globe-europe-africa':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-globe-europe-africa.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-globe-europe-africa.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-globe-europe-africa.svg')
          .default;
      }

    case 'hand-raised':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-hand-raised.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-hand-raised.svg').default;
      } else {
        return require('../../../assets/icons/solid-hand-raised.svg').default;
      }

    case 'hand-thumb-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-hand-thumb-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-hand-thumb-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-hand-thumb-down.svg')
          .default;
      }

    case 'hand-thumb-up':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-hand-thumb-up.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-hand-thumb-up.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-hand-thumb-up.svg').default;
      }

    case 'hashtag':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-hashtag.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-hashtag.svg').default;
      } else {
        return require('../../../assets/icons/solid-hashtag.svg').default;
      }

    case 'heart':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-heart.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-heart.svg').default;
      } else {
        return require('../../../assets/icons/solid-heart.svg').default;
      }

    case 'home':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-home.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-home.svg').default;
      } else {
        return require('../../../assets/icons/solid-home.svg').default;
      }

    case 'home-modern':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-home-modern.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-home-modern.svg').default;
      } else {
        return require('../../../assets/icons/solid-home-modern.svg').default;
      }

    case 'identification':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-identification.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-identification.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-identification.svg')
          .default;
      }

    case 'inbox':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-inbox.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-inbox.svg').default;
      } else {
        return require('../../../assets/icons/solid-inbox.svg').default;
      }

    case 'inbox-arrow-down':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-inbox-arrow-down.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-inbox-arrow-down.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-inbox-arrow-down.svg')
          .default;
      }

    case 'inbox-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-inbox-stack.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-inbox-stack.svg').default;
      } else {
        return require('../../../assets/icons/solid-inbox-stack.svg').default;
      }

    case 'information-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-information-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-information-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-information-circle.svg')
          .default;
      }

    case 'key':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-key.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-key.svg').default;
      } else {
        return require('../../../assets/icons/solid-key.svg').default;
      }

    case 'language':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-language.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-language.svg').default;
      } else {
        return require('../../../assets/icons/solid-language.svg').default;
      }

    case 'lens':
      return require('../../../assets/icons/lens.svg').default;

    case 'lifebuoy':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-lifebuoy.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-lifebuoy.svg').default;
      } else {
        return require('../../../assets/icons/solid-lifebuoy.svg').default;
      }

    case 'light-bulb':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-light-bulb.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-light-bulb.svg').default;
      } else {
        return require('../../../assets/icons/solid-light-bulb.svg').default;
      }

    case 'link':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-link.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-link.svg').default;
      } else {
        return require('../../../assets/icons/solid-link.svg').default;
      }

    case 'list-bullet':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-list-bullet.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-list-bullet.svg').default;
      } else {
        return require('../../../assets/icons/solid-list-bullet.svg').default;
      }

    case 'lock-closed':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-lock-closed.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-lock-closed.svg').default;
      } else {
        return require('../../../assets/icons/solid-lock-closed.svg').default;
      }

    case 'lock-open':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-lock-open.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-lock-open.svg').default;
      } else {
        return require('../../../assets/icons/solid-lock-open.svg').default;
      }

    case 'magnifying-glass':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-magnifying-glass.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-magnifying-glass.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-magnifying-glass.svg')
          .default;
      }

    case 'magnifying-glass-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-magnifying-glass-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-magnifying-glass-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-magnifying-glass-circle.svg')
          .default;
      }

    case 'magnifying-glass-minus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-magnifying-glass-minus.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-magnifying-glass-minus.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-magnifying-glass-minus.svg')
          .default;
      }

    case 'magnifying-glass-plus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-magnifying-glass-plus.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-magnifying-glass-plus.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-magnifying-glass-plus.svg')
          .default;
      }

    case 'map':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-map.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-map.svg').default;
      } else {
        return require('../../../assets/icons/solid-map.svg').default;
      }

    case 'map-pin':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-map-pin.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-map-pin.svg').default;
      } else {
        return require('../../../assets/icons/solid-map-pin.svg').default;
      }

    case 'megaphone':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-megaphone.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-megaphone.svg').default;
      } else {
        return require('../../../assets/icons/solid-megaphone.svg').default;
      }

    case 'microphone':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-microphone.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-microphone.svg').default;
      } else {
        return require('../../../assets/icons/solid-microphone.svg').default;
      }

    case 'minus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-minus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-minus.svg').default;
      } else {
        return require('../../../assets/icons/solid-minus.svg').default;
      }

    case 'minus-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-minus-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-minus-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-minus-circle.svg').default;
      }

    case 'minus-small':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-minus-small.svg').default;
      } else {
        return require('../../../assets/icons/outline-minus-small.svg').default;
      }

    case 'minus-small-1':
      return require('../../../assets/icons/outline-minus-small-1.svg').default;
    case 'moon':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-moon.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-moon.svg').default;
      } else {
        return require('../../../assets/icons/solid-moon.svg').default;
      }

    case 'musical-note':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-musical-note.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-musical-note.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-musical-note.svg').default;
      }

    case 'newspaper':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-newspaper.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-newspaper.svg').default;
      } else {
        return require('../../../assets/icons/solid-newspaper.svg').default;
      }

    case 'no-symbol':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-no-symbol.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-no-symbol.svg').default;
      } else {
        return require('../../../assets/icons/solid-no-symbol.svg').default;
      }

    case 'paint-brush':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-paint-brush.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-paint-brush.svg').default;
      } else {
        return require('../../../assets/icons/solid-paint-brush.svg').default;
      }

    case 'paper-airplane':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-paper-airplane.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-paper-airplane.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-paper-airplane.svg')
          .default;
      }

    case 'paper-clip':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-paper-clip.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-paper-clip.svg').default;
      } else {
        return require('../../../assets/icons/solid-paper-clip.svg').default;
      }

    case 'pause':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-pause.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-pause.svg').default;
      } else {
        return require('../../../assets/icons/solid-pause.svg').default;
      }

    case 'pause-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-pause-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-pause-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-pause-circle.svg').default;
      }

    case 'pencil':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-pencil.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-pencil.svg').default;
      } else {
        return require('../../../assets/icons/solid-pencil.svg').default;
      }

    case 'pencil-square':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-pencil-square.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-pencil-square.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-pencil-square.svg').default;
      }

    case 'phone':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-phone.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-phone.svg').default;
      } else {
        return require('../../../assets/icons/solid-phone.svg').default;
      }

    case 'phone-arrow-down-left':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-phone-arrow-down-left.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-phone-arrow-down-left.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-phone-arrow-down-left.svg')
          .default;
      }

    case 'phone-arrow-up-right':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-phone-arrow-up-right.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-phone-arrow-up-right.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-phone-arrow-up-right.svg')
          .default;
      }

    case 'phone-x-mark':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-phone-x-mark.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-phone-x-mark.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-phone-x-mark.svg').default;
      }

    case 'photo':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-photo.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-photo.svg').default;
      } else {
        return require('../../../assets/icons/solid-photo.svg').default;
      }

    case 'play':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-play.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-play.svg').default;
      } else {
        return require('../../../assets/icons/solid-play.svg').default;
      }

    case 'play-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-play-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-play-circle.svg').default;
      } else {
        return require('../../../assets/icons/solid-play-circle.svg').default;
      }

    case 'play-pause':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-play-pause.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-play-pause.svg').default;
      } else {
        return require('../../../assets/icons/solid-play-pause.svg').default;
      }

    case 'plus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-plus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-plus.svg').default;
      } else {
        return require('../../../assets/icons/solid-plus.svg').default;
      }

    case 'plus-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-plus-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-plus-circle.svg').default;
      } else {
        return require('../../../assets/icons/solid-plus-circle.svg').default;
      }

    case 'plus-small':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-plus-small.svg').default;
      } else {
        return require('../../../assets/icons/outline-plus-small.svg').default;
      }

    case 'plus-small-1':
      return require('../../../assets/icons/outline-plus-small-1.svg').default;

    case 'plus-thick':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-plus-thick.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-plus-thick.svg').default;
      } else {
        return require('../../../assets/icons/solid-plus-thick.svg').default;
      }

    case 'power':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-power.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-power.svg').default;
      } else {
        return require('../../../assets/icons/solid-power.svg').default;
      }

    case 'presentation-chart-bar':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-presentation-chart-bar.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-presentation-chart-bar.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-presentation-chart-bar.svg')
          .default;
      }

    case 'presentation-chart-line':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-presentation-chart-line.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-presentation-chart-line.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-presentation-chart-line.svg')
          .default;
      }

    case 'printer':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-printer.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-printer.svg').default;
      } else {
        return require('../../../assets/icons/solid-printer.svg').default;
      }

    case 'puzzle-piece':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-puzzle-piece.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-puzzle-piece.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-puzzle-piece.svg').default;
      }

    case 'qr-code':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-qr-code.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-qr-code.svg').default;
      } else {
        return require('../../../assets/icons/solid-qr-code.svg').default;
      }

    case 'question-mark-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-question-mark-circle.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-question-mark-circle.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-question-mark-circle.svg')
          .default;
      }

    case 'queue-list':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-queue-list.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-queue-list.svg').default;
      } else {
        return require('../../../assets/icons/solid-queue-list.svg').default;
      }

    case 'radio':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-radio.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-radio.svg').default;
      } else {
        return require('../../../assets/icons/solid-radio.svg').default;
      }

    case 'receipt-percent':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-receipt-percent.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-receipt-percent.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-receipt-percent.svg')
          .default;
      }

    case 'receipt-refund':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-receipt-refund.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-receipt-refund.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-receipt-refund.svg')
          .default;
      }

    case 'rectangle-group':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-rectangle-group.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-rectangle-group.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-rectangle-group.svg')
          .default;
      }

    case 'rectangle-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-rectangle-stack.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-rectangle-stack.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-rectangle-stack.svg')
          .default;
      }

    case 'rocket-launch':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-rocket-launch.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-rocket-launch.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-rocket-launch.svg').default;
      }

    case 'rss':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-rss.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-rss.svg').default;
      } else {
        return require('../../../assets/icons/solid-rss.svg').default;
      }

    case 'scale':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-scale.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-scale.svg').default;
      } else {
        return require('../../../assets/icons/solid-scale.svg').default;
      }

    case 'scissors':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-scissors.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-scissors.svg').default;
      } else {
        return require('../../../assets/icons/solid-scissors.svg').default;
      }

    case 'server':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-server.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-server.svg').default;
      } else {
        return require('../../../assets/icons/solid-server.svg').default;
      }

    case 'server-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-server-stack.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-server-stack.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-server-stack.svg').default;
      }

    case 'share':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-share.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-share.svg').default;
      } else {
        return require('../../../assets/icons/solid-share.svg').default;
      }

    case 'shield-check':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-shield-check.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-shield-check.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-shield-check.svg').default;
      }

    case 'shield-exclamation':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-shield-exclamation.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-shield-exclamation.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-shield-exclamation.svg')
          .default;
      }

    case 'shopping-bag':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-shopping-bag.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-shopping-bag.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-shopping-bag.svg').default;
      }

    case 'shopping-cart':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-shopping-cart.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-shopping-cart.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-shopping-cart.svg').default;
      }

    case 'signal':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-signal.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-signal.svg').default;
      } else {
        return require('../../../assets/icons/solid-signal.svg').default;
      }

    case 'signal-slash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-signal-slash.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-signal-slash.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-signal-slash.svg').default;
      }

    case 'sparkles':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-sparkles.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-sparkles.svg').default;
      } else {
        return require('../../../assets/icons/solid-sparkles.svg').default;
      }

    case 'speaker-wave':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-speaker-wave.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-speaker-wave.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-speaker-wave.svg').default;
      }

    case 'speaker-x-mark':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-speaker-x-mark.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-speaker-x-mark.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-speaker-x-mark.svg')
          .default;
      }

    case 'square-2-stack':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-square-2-stack.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-square-2-stack.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-square-2-stack.svg')
          .default;
      }

    case 'square-3-stack-3d':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-square-3-stack-3d.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-square-3-stack-3d.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-square-3-stack-3d.svg')
          .default;
      }

    case 'squares-2x2':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-squares-2x2.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-squares-2x2.svg').default;
      } else {
        return require('../../../assets/icons/solid-squares-2x2.svg').default;
      }

    case 'squares-plus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-squares-plus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-squares-plus.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-squares-plus.svg').default;
      }

    case 'star':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-star.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-star.svg').default;
      } else {
        return require('../../../assets/icons/solid-star.svg').default;
      }

    case 'stop':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-stop.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-stop.svg').default;
      } else {
        return require('../../../assets/icons/solid-stop.svg').default;
      }

    case 'stop-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-stop-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-stop-circle.svg').default;
      } else {
        return require('../../../assets/icons/solid-stop-circle.svg').default;
      }

    case 'sun':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-sun.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-sun.svg').default;
      } else {
        return require('../../../assets/icons/solid-sun.svg').default;
      }

    case 'swatch':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-swatch.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-swatch.svg').default;
      } else {
        return require('../../../assets/icons/solid-swatch.svg').default;
      }

    case 'table-cells':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-table-cells.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-table-cells.svg').default;
      } else {
        return require('../../../assets/icons/solid-table-cells.svg').default;
      }

    case 'tag':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-tag.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-tag.svg').default;
      } else {
        return require('../../../assets/icons/solid-tag.svg').default;
      }

    case 'ticket':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-ticket.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-ticket.svg').default;
      } else {
        return require('../../../assets/icons/solid-ticket.svg').default;
      }

    case 'trash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-trash.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-trash.svg').default;
      } else {
        return require('../../../assets/icons/solid-trash.svg').default;
      }

    case 'trophy':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-trophy.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-trophy.svg').default;
      } else {
        return require('../../../assets/icons/solid-trophy.svg').default;
      }

    case 'truck':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-truck.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-truck.svg').default;
      } else {
        return require('../../../assets/icons/solid-truck.svg').default;
      }

    case 'tv':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-tv.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-tv.svg').default;
      } else {
        return require('../../../assets/icons/solid-tv.svg').default;
      }

    case 'user':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-user.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-user.svg').default;
      } else {
        return require('../../../assets/icons/solid-user.svg').default;
      }

    case 'user-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-user-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-user-circle.svg').default;
      } else {
        return require('../../../assets/icons/solid-user-circle.svg').default;
      }

    case 'user-group':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-user-group.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-user-group.svg').default;
      } else {
        return require('../../../assets/icons/solid-user-group.svg').default;
      }

    case 'user-minus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-user-minus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-user-minus.svg').default;
      } else {
        return require('../../../assets/icons/solid-user-minus.svg').default;
      }

    case 'user-plus':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-user-plus.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-user-plus.svg').default;
      } else {
        return require('../../../assets/icons/solid-user-plus.svg').default;
      }

    case 'users':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-users.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-users.svg').default;
      } else {
        return require('../../../assets/icons/solid-users.svg').default;
      }

    case 'variable':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-variable.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-variable.svg').default;
      } else {
        return require('../../../assets/icons/solid-variable.svg').default;
      }

    case 'video-camera':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-video-camera.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-video-camera.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-video-camera.svg').default;
      }

    case 'video-camera-slash':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-video-camera-slash.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-video-camera-slash.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-video-camera-slash.svg')
          .default;
      }

    case 'view-columns':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-view-columns.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-view-columns.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-view-columns.svg').default;
      }

    case 'viewfinder-dot':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-viewfinder-dot.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-viewfinder-dot.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-viewfinder-dot.svg')
          .default;
      }

    case 'wallet':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-wallet.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-wallet.svg').default;
      } else {
        return require('../../../assets/icons/solid-wallet.svg').default;
      }

    case 'wifi':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-wifi.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-wifi.svg').default;
      } else {
        return require('../../../assets/icons/solid-wifi.svg').default;
      }

    case 'window':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-window.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-window.svg').default;
      } else {
        return require('../../../assets/icons/solid-window.svg').default;
      }

    case 'wrench':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-wrench.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-wrench.svg').default;
      } else {
        return require('../../../assets/icons/solid-wrench.svg').default;
      }

    case 'wrench-screwdriver':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-wrench-screwdriver.svg')
          .default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-wrench-screwdriver.svg')
          .default;
      } else {
        return require('../../../assets/icons/solid-wrench-screwdriver.svg')
          .default;
      }

    case 'x-circle':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-x-circle.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-x-circle.svg').default;
      } else {
        return require('../../../assets/icons/solid-x-circle.svg').default;
      }

    case 'x-mark':
      if (type === 'mini') {
        return require('../../../assets/icons/mini-x-mark.svg').default;
      } else if (type === 'outline') {
        return require('../../../assets/icons/outline-x-mark.svg').default;
      } else {
        return require('../../../assets/icons/solid-x-mark.svg').default;
      }

    default:
      return null;
  }
};

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  // color?: string;
  type?: IconType;
}

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  type = 'solid',
  color = '#0F172A',
}) => {
  if (!iconSet.has(name)) {
    console.warn(`Icon ${name} not found`);
  }
  const IconComp = getIcon(name, type);
  return <IconComp height={size} width={size} color={color} />;
};
