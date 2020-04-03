<template>
  <div style="width:100%;">
    <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>-->
    <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed">
      <!-- <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>-->
      <a-sub-menu :key="item.name" v-for="(item,index) in routarr">
        <span slot="title">
          <a-icon type="mail" />
          <span>{{item.name}}</span>
        </span>
        <template v-if="item.list.length>=1">
          <a-menu-item
            tag="a-menu-item"
            @click="topath(childitem.url)"
            :key="indexkey+'child'"
            v-for="(childitem,indexkey) in item.list"
          >{{childitem.name}}</a-menu-item>
        </template>
      </a-sub-menu>
      <!-- <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>-->
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      routarr: []
    };
  },
  created() {
    let routes = JSON.parse(localStorage.getItem("router")) || null;
    if (routes && routes.length >= 1) {
      this.routarr = routes;
    } else {
      this.$router.push("/404");
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    topath(url) {
      this.$router.push(url.replace("/", "-"));
    }
  }
};
</script>
