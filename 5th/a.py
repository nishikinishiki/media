import matplotlib.pyplot as plt
import numpy as np

# --- 1. データの定義 ---
total = 40226
attr_ok = 27824
appoint = 8065
contract = 658

# --- 2. コンバージョン・ファネルと1%強調グラフの作成 ---
def plot_funnel_and_ratio():
    labels = ['Total (全体)', 'Target Attr (属性〇)', 'Appoint (アポ)', 'Contract (契約)']
    values = [total, attr_ok, appoint, contract]
    percentages = [v / total * 100 for v in values]

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    # 左図：水平バーによるファネルチャート
    y_pos = np.arange(len(labels))
    max_w = values[0]
    lefts = [(max_w - w) / 2 for w in values]
    colors = ['#ced4da', '#adb5bd', '#6c757d', '#dc3545']

    ax1.barh(y_pos, values, left=lefts, color=colors, height=0.7)
    ax1.set_yticks(y_pos)
    ax1.set_yticklabels(labels)
    ax1.invert_yaxis()
    ax1.set_title('Conversion Funnel (全体からの推移)', fontsize=14, fontweight='bold')
    ax1.axis('off')

    # 各バーに数値を表示
    for i, (w, p) in enumerate(zip(values, percentages)):
        ax1.text(max_w / 2, i, f'{w:,}\n({p:.1f}%)', ha='center', va='center', fontweight='bold')

    # 右図：契約 vs 未契約のシンプル比率
    pie_labels = ['Contract (契約)', 'Uncontracted (未契約)']
    pie_sizes = [contract, total - contract]
    ax2.pie(pie_sizes, labels=pie_labels, autopct='%1.1f%%', startangle=140, 
            colors=['#dc3545', '#e9ecef'], explode=(0.2, 0), shadow=True)
    ax2.set_title('Total Ratio (全体における契約割合)', fontsize=14, fontweight='bold')

    plt.tight_layout()
    plt.savefig('conversion_funnel.png')
    plt.show()

# --- 3. ステータス内訳の円グラフ（詳細版）の作成 ---
def plot_detailed_breakdown():
    # 各セグメントが重複しないように計算
    s1_contract = contract
    s2_appoint_no_contract = appoint - contract
    s3_attr_no_appoint = attr_ok - appoint
    s4_others = total - attr_ok

    segments = [s1_contract, s2_appoint_no_contract, s3_attr_no_appoint, s4_others]
    labels = [
        f'Contract (契約): {s1_contract:,}',
        f'Appointed/No Contract (アポ済/未契約): {s2_appoint_no_contract:,}',
        f'Target Attr/No Appoint (属性〇/未アポ): {s3_attr_no_appoint:,}',
        f'Others (その他): {s4_others:,}'
    ]
    colors = ['#dc3545', '#ffc107', '#007bff', '#e9ecef']

    plt.figure(figsize=(10, 7))
    # ドーナツチャート形式で作成
    plt.pie(segments, labels=None, autopct='%1.1f%%', startangle=140, 
            colors=colors, pctdistance=0.85, explode=[0.1, 0, 0, 0])
    
    # 中央に白い円を描画してドーナツ状にする
    centre_circle = plt.Circle((0,0), 0.70, fc='white')
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)

    plt.legend(labels, loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))
    plt.title('Breakdown of All Leads (全リードの構成内訳)', fontsize=15, fontweight='bold')
    plt.tight_layout()
    plt.savefig('detailed_breakdown.png')
    plt.show()

# 実行
plot_funnel_and_ratio()
plot_detailed_breakdown()